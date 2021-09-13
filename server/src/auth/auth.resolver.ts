import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LocalLoginInput, LocalLoginOutput } from './dtos';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(returns => LocalLoginOutput)
  login(
    @Args('input') localLoginInput: LocalLoginInput,
  ): Promise<LocalLoginOutput> {
    return this.authService.login(localLoginInput);
  }
}
