import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { deleteFile } from 'src/common/lib/files';
import { Repository } from 'typeorm';
import {
  CreateUserInfoInput,
  CreateUserInfoOutput,
  DeleteUserInfoInput,
  DeleteUserInfoOutput,
  EditUserInfoInput,
  EditUserInfoOutput,
  GetAllUsersInfoOutput,
  GetUserInfoInput,
  GetUserInfoOutput,
  MeOutput,
} from '../dtos';
import { User } from '../entities/user.entity';
import { UserInfo } from '../entities/userInfo.entity';

@Injectable()
export class UserInfoService {
  constructor(
    @InjectRepository(UserInfo)
    private readonly usersInfo: Repository<UserInfo>,
  ) {}

  async me(user: User): Promise<MeOutput> {
    try {
      const userInfo = await this.usersInfo.findOne({
        where: { id: user.userInfo.id },
      });
      if (!userInfo) {
        return {
          ok: false,
          error: `User info not found`,
        };
      }
      return {
        ok: true,
        userInfo,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Cannot get my info',
      };
    }
  }

  async getAllUsersInfo(): Promise<GetAllUsersInfoOutput> {
    try {
      const usersInfo = await this.usersInfo.find();
      return {
        ok: true,
        usersInfo,
      };
    } catch {
      return {
        ok: false,
        error: 'Could not find users info',
      };
    }
  }

  async getUserInfo({
    id,
    email,
  }: GetUserInfoInput): Promise<GetUserInfoOutput> {
    try {
      const userInfo = id
        ? await this.usersInfo.findOneOrFail({ id })
        : await this.usersInfo.findOneOrFail({ where: { email } });
      return {
        ok: true,
        userInfo,
      };
    } catch {
      return {
        ok: false,
        error: 'Could not find user info',
      };
    }
  }

  async createUserInfo({
    email,
    userName,
  }: CreateUserInfoInput): Promise<CreateUserInfoOutput> {
    try {
      const ok = await this.usersInfo.findOne({ email });
      if (ok) {
        return {
          ok: false,
          error: 'Email already exists',
        };
      }
      const userInfo = await this.usersInfo.save(
        this.usersInfo.create({ email, userName }),
      );
      return {
        ok: true,
        userInfo,
      };
    } catch {
      return {
        ok: false,
        error: 'Could not create user info',
      };
    }
  }

  async editUserInfo(
    user: User,
    editUserInfoInput: EditUserInfoInput,
  ): Promise<EditUserInfoOutput> {
    try {
      const userInfo = await this.usersInfo.findOne(editUserInfoInput.id);
      if (!userInfo) {
        return {
          ok: false,
          error: 'User info not found',
        };
      }
      if (userInfo.userId !== user.id) {
        return {
          ok: false,
          error: `Not allowed to edit other user's profile`,
        };
      }
      const editInfo = Object.entries(editUserInfoInput);
      editInfo.map(info => (userInfo[info[0]] = info[1]));
      await this.usersInfo.save(userInfo);
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        // error: 'Could not edit profile',
        error,
      };
    }
  }

  async deleteUserInfo(
    user: User,
    { id }: DeleteUserInfoInput,
  ): Promise<DeleteUserInfoOutput> {
    try {
      const userInfo = await this.usersInfo.findOne(id);
      if (!userInfo) {
        return {
          ok: false,
          error: 'User info not found',
        };
      }
      if (userInfo.user.id !== user.id) {
        return {
          ok: false,
          error: `Not allowed to delete other user's profile`,
        };
      }
      const bucket = process.env.CELEB_PAGE_BUCKET;
      const profileImage = userInfo.profileImage;
      const coverImage = userInfo.coverImage;
      const signature = userInfo.signature;
      [profileImage, coverImage, signature].map(async fileUrl => {
        const { ok, error } = await deleteFile({ bucket, fileUrl });
        if (!ok || error) {
          return {
            ok: false,
            error,
          };
        }
      });
      await this.usersInfo.delete(id);
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Cannot delete user info',
      };
    }
  }
}
