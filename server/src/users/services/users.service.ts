import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NoFragmentCyclesRule } from 'graphql';
import { FollowService } from 'src/follow/follow.service';
import { LettersService } from 'src/letters/letters.service';
import { Repository } from 'typeorm';
import {
  CreateUserInput,
  CreateUserOutput,
  DeleteUserInput,
  DeleteUserOutput,
  GetUserByEmailInput,
  GetUserByEmailOutput,
  GetUserByIdInput,
  GetUserByIdOutput,
  VerifyEmailInput,
  VerifyEmailOutput,
} from '../dtos';
import { User } from '../entities/user.entity';
import { Verification } from '../entities/verification.entity';
import { UserInfoService } from './userInfo.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly users: Repository<User>,
    @InjectRepository(Verification)
    private readonly verification: Repository<Verification>,
    private readonly userInfoService: UserInfoService,
    private readonly lettersService: LettersService,
    private readonly followService: FollowService,
  ) {}

  async getUserById({ id }: GetUserByIdInput): Promise<GetUserByIdOutput> {
    try {
      const user = await this.users.findOne({ id });
      if (!user) {
        return {
          ok: false,
          error: 'User not found',
        };
      }
      return {
        ok: true,
        user,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Cannot get the user',
      };
    }
  }

  async getUserByEmail({
    email,
  }: GetUserByEmailInput): Promise<GetUserByEmailOutput> {
    try {
      const { ok, error, userInfo } = await this.userInfoService.getUserInfo({
        email,
      });
      if (!ok) return { ok, error };
      const user = await this.users.findOneOrFail({ id: userInfo.userId });
      return {
        ok: true,
        user,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Cannot get user by email',
      };
    }
  }

  async createUser({
    email,
    userName,
  }: CreateUserInput): Promise<CreateUserOutput> {
    try {
      const {
        ok,
        error,
        userInfo,
      } = await this.userInfoService.createUserInfo({ email, userName });
      if (!ok) {
        return { ok, error };
      }
      await this.users.save(this.users.create({ userInfo }));
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Cannot create user',
      };
    }
  }

  async deleteUser(
    user: User,
    { id }: DeleteUserInput,
  ): Promise<DeleteUserOutput> {
    try {
      const dbUser = await this.users.findOne(id);
      if (!user) {
        return {
          ok: false,
          error: 'User not found',
        };
      }
      if (dbUser.id !== user.id) {
        return {
          ok: false,
          error: `Not allowed to delete other user`,
        };
      }
      await this.userInfoService.deleteUserInfo(user, { id });
      await this.lettersService.deleteAllLetters(user);
      await this.followService.deleteAllFollows(user);
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Cannot delete user',
      };
    }
  }

  async verifyEmail({ code }: VerifyEmailInput): Promise<VerifyEmailOutput> {
    try {
      const verification = await this.verification.findOne(
        { code },
        { relations: ['user'] },
      );
      if (!verification) {
        return {
          ok: false,
          error: 'Verification not found',
        };
      }
      verification.user.verified = true;
      await this.users.save(verification.user);
      await this.verification.delete(verification.id);
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: 'Could not verify email',
      };
    }
  }
}
