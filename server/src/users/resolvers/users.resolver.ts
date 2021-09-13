import {
  CreateUserInput,
  CreateUserOutput,
  DeleteUserInput,
  DeleteUserOutput,
  GetUserByIdInput,
  GetUserByIdOutput,
  VerifyEmailInput,
  VerifyEmailOutput,
} from '../dtos';
import { User } from '../entities/user.entity';
import { UsersService } from '../services/users.service';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/decorators/authUser.decorator';
import { Role } from 'src/auth/decorators/role.decorator';

@Resolver(of => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Role(['Any'])
  @Query(returns => GetUserByIdOutput)
  getUserById(
    @Args('input') getUserByIdInput: GetUserByIdInput,
  ): Promise<GetUserByIdOutput> {
    return this.usersService.getUserById(getUserByIdInput);
  }

  @Mutation(returns => CreateUserOutput)
  createUser(
    @Args('input') createUserInput: CreateUserInput,
  ): Promise<CreateUserOutput> {
    return this.usersService.createUser(createUserInput);
  }

  @Role(['Any'])
  @Mutation(returns => DeleteUserOutput)
  deleteUser(
    @AuthUser() user: User,
    @Args('input') deleteUserInput: DeleteUserInput,
  ): Promise<DeleteUserOutput> {
    return this.usersService.deleteUser(user, deleteUserInput);
  }

  @Role(['Any'])
  @Mutation(returns => VerifyEmailOutput)
  verifyEmail(
    @Args('input') verifyEmailInput: VerifyEmailInput,
  ): Promise<VerifyEmailOutput> {
    return this.usersService.verifyEmail(verifyEmailInput);
  }
}
