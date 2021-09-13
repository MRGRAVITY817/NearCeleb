import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthUser, Role } from 'src/auth/decorators';
import { CelebInfo } from 'src/celebs/entities/celebInfo.entity';
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
import { UserInfoService } from '../services/userInfo.service';

@Resolver(of => CelebInfo)
export class UserInfoResolver {
  constructor(private readonly userInfoService: UserInfoService) {}

  @Role(['Fans', 'Admin'])
  @Query(returns => MeOutput)
  me(@AuthUser() user: User): Promise<MeOutput> {
    return this.userInfoService.me(user);
  }

  @Query(returns => GetAllUsersInfoOutput)
  getAllUsersInfo(): Promise<GetAllUsersInfoOutput> {
    return this.userInfoService.getAllUsersInfo();
  }

  @Query(returns => GetUserInfoOutput)
  getUserInfo(
    @Args('input') getUserInfoInput: GetUserInfoInput,
  ): Promise<GetUserInfoOutput> {
    return this.userInfoService.getUserInfo(getUserInfoInput);
  }

  @Mutation(returns => CreateUserInfoOutput)
  createUserInfo(
    @Args('input') createUserInfoInput: CreateUserInfoInput,
  ): Promise<CreateUserInfoOutput> {
    return this.userInfoService.createUserInfo(createUserInfoInput);
  }

  @Role(['Fans', 'Admin'])
  @Mutation(returns => EditUserInfoOutput)
  editUserInfo(
    @AuthUser() user: User,
    @Args('input') editUserInfoInput: EditUserInfoInput,
  ): Promise<EditUserInfoOutput> {
    return this.userInfoService.editUserInfo(user, editUserInfoInput);
  }

  @Role(['Fans', 'Admin'])
  @Mutation(returns => DeleteUserInfoOutput)
  deleteUserInfo(
    @AuthUser() user: User,
    @Args('input') deleteUserInfoInput: DeleteUserInfoInput,
  ): Promise<DeleteUserInfoOutput> {
    return this.userInfoService.deleteUserInfo(user, deleteUserInfoInput);
  }
}
