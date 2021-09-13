import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/decorators/authUser.decorator';
import { Role } from 'src/auth/decorators/role.decorator';
import { User } from 'src/users/entities/user.entity';
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
import { FollowService } from './follow.service';

@Resolver(of => Follow)
export class FollowResolver {
  constructor(private readonly followService: FollowService) {}

  @Role(['Any'])
  @Query(returns => GetFollowingByUserOutput)
  getFollowingByUser(
    @Args('input') getFollowingByUserInput: GetFollowingByUserInput,
  ): Promise<GetFollowingByUserOutput> {
    return this.followService.getFollowingByUser(getFollowingByUserInput);
  }

  @Role(['Any'])
  @Query(returns => GetFollowersByCelebOutput)
  getFollowersByCeleb(
    @Args('input') getFollowersByCelebInput: GetFollowersByCelebInput,
  ): Promise<GetFollowersByCelebOutput> {
    return this.followService.getFollowersByCeleb(getFollowersByCelebInput);
  }

  @Role(['Any'])
  @Query(returns => IsFollowingOutput)
  isFollowing(
    @AuthUser() user: User,
    @Args('input') isFollowingInput: IsFollowingInput,
  ): Promise<IsFollowingOutput> {
    return this.followService.isFollowing(user, isFollowingInput);
  }

  @Role(['Any'])
  @Mutation(returns => ToggleFollowOutput)
  toggleFollow(
    @AuthUser() user: User,
    @Args('input') toggleFollowInput: ToggleFollowInput,
  ): Promise<ToggleFollowOutput> {
    return this.followService.toggleFollow(user, toggleFollowInput);
  }

  @Role(['Any'])
  @Mutation(returns => DeleteAllFollowsOutput)
  deleteAllFollows(@AuthUser() user: User): Promise<ToggleFollowOutput> {
    return this.followService.deleteAllFollows(user);
  }
}
