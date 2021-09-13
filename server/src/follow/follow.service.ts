import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CelebsService } from 'src/celebs/celebs.service';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import {
  DeleteAllFollowsOutput,
  GetFollowersByCelebInput,
  GetFollowersByCelebOutput,
  GetFollowingByUserInput,
  GetFollowingByUserOutput,
  IsFollowingInput,
  IsFollowingOutput,
  ToggleFollowInput,
  ToggleFollowOutput,
} from './dtos';
import { Follow } from './entities/follow.entity';

@Injectable()
export class FollowService {
  constructor(
    // Repo
    @InjectRepository(Follow)
    private readonly follow: Repository<Follow>,
    // Service
    private readonly celebsService: CelebsService,
  ) {}

  async getFollowingByUser({
    userId,
  }: GetFollowingByUserInput): Promise<GetFollowingByUserOutput> {
    try {
      const [following, followingCount] = await this.follow.findAndCount({
        where: { userId },
      });
      return {
        ok: true,
        following: following.map(f => f.celeb),
        followingCount,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Cannot get following celeb list',
      };
    }
  }

  async getFollowersByCeleb({
    celebId,
  }: GetFollowersByCelebInput): Promise<GetFollowersByCelebOutput> {
    try {
      const { ok, error, celeb } = await this.celebsService.getCelebObjectById({
        id: celebId,
      });
      if (!ok) return { ok, error };
      const [followers, followersCount] = await this.follow.findAndCount({
        where: { celeb },
      });
      return {
        ok: true,
        followers: followers.map(f => f.user),
        followersCount,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Cannot get followers user list',
      };
    }
  }

  async isFollowing(
    user: User,
    { celebId }: IsFollowingInput,
  ): Promise<IsFollowingOutput> {
    try {
      const { ok, error, celeb } = await this.celebsService.getCelebObjectById({
        id: celebId,
      });
      if (!ok) return { ok, error };
      const isFollowing = await this.follow.findOne({
        where: {
          celeb,
          user,
        },
      });
      return {
        ok: true,
        isFollowing: isFollowing ? true : false,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Cannot check if following the celeb',
      };
    }
  }

  async toggleFollow(
    user: User,
    { celebId }: ToggleFollowInput,
  ): Promise<ToggleFollowOutput> {
    try {
      const { ok, error, celeb } = await this.celebsService.getCelebObjectById({
        id: celebId,
      });
      if (!ok) return { ok, error };
      const following = await this.follow.findOne({
        where: {
          celeb,
          user,
        },
      });
      following
        ? await this.follow.delete(following.id)
        : await this.follow.save(
            this.follow.create({
              user,
              celeb,
            }),
          );
      return {
        ok: true,
        isFollowing: following ? false : true,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
  async deleteAllFollows(user: User): Promise<DeleteAllFollowsOutput> {
    try {
      const { ok, error, following } = await this.getFollowingByUser({
        userId: user.id,
      });
      if (!ok) return { ok, error };
      following.map(async f => await this.follow.delete(f.id));
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Cannot delete all follows',
      };
    }
  }
}
