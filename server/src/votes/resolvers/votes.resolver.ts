import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthUser, Role } from 'src/auth/decorators';
import { User } from 'src/users/entities/user.entity';
import {
  GetVotesByCelebInput,
  GetVotesByCelebOutput,
  GetVotesByUserOutput,
} from '../dtos/general';
import { Vote } from '../entities/vote.entity';
import { VotesService } from '../services/votes.service';

@Resolver(of => Vote)
export class VotesResolver {
  constructor(private readonly votesService: VotesService) {}

  @Role(['Any'])
  @Query(returns => GetVotesByCelebOutput)
  getVotesByCeleb(
    @Args('input') getVotesByCelebInput: GetVotesByCelebInput,
  ): Promise<GetVotesByCelebOutput> {
    return this.votesService.getVotesByCeleb(getVotesByCelebInput);
  }

  @Role(['Any'])
  @Query(returns => GetVotesByUserOutput)
  getVotesByUser(@AuthUser() user: User): Promise<GetVotesByUserOutput> {
    return this.votesService.getVotesByUser(user);
  }
}
