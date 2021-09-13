import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthUser, Role } from 'src/auth/decorators';
import { User } from 'src/users/entities/user.entity';
import {
  GetAllAddVotesInput,
  GetAllAddVotesOutput,
  GetAddVotesByUserInput,
  GetAddVotesByUserOutput,
  CreateAddVoteInput,
  CreateAddVoteOutput,
  ConfirmAddVoteOutput,
  ConfirmAddVoteInput,
  RemoveAddVoteOutput,
  RemoveAddVoteInput,
} from '../dtos/addVote';
import { AddVote } from '../entities/addVote.entity';
import { AddVotesService } from '../services/addVotes.service';

@Resolver(of => AddVote)
export class AddVotesResolver {
  constructor(private readonly addVotesService: AddVotesService) {}

  @Role(['Any'])
  @Query(returns => GetAllAddVotesOutput)
  getAllAddVotes(
    @Args('input') getAllAddVotesInput: GetAllAddVotesInput,
  ): Promise<GetAllAddVotesOutput> {
    return this.addVotesService.getAllAddVotes(getAllAddVotesInput);
  }

  @Role(['Any'])
  @Query(returns => GetAddVotesByUserOutput)
  getAddVotesByUser(
    @AuthUser() user: User,
    @Args('input') getAddVotesByUserInput: GetAddVotesByUserInput,
  ): Promise<GetAddVotesByUserOutput> {
    return this.addVotesService.getAddVotesByUser(
      user.userVote,
      getAddVotesByUserInput,
    );
  }

  @Role(['Any'])
  @Mutation(returns => CreateAddVoteOutput)
  createAddVote(
    @AuthUser() user: User,
    @Args('input') createAddVoteInput: CreateAddVoteInput,
  ): Promise<CreateAddVoteOutput> {
    return this.addVotesService.createAddVote(
      user.userVote,
      createAddVoteInput,
    );
  }

  @Mutation(returns => ConfirmAddVoteOutput)
  confirmAddVote(
    @AuthUser() user: User,
    @Args('input') confirmAddVoteInput: ConfirmAddVoteInput,
  ): Promise<ConfirmAddVoteOutput> {
    return this.addVotesService.confirmAddVote(confirmAddVoteInput);
  }

  @Role(['Any'])
  @Mutation(returns => RemoveAddVoteOutput)
  removeAddVote(
    @AuthUser() user: User,
    @Args('input') removeAddVoteInput: RemoveAddVoteInput,
  ): Promise<RemoveAddVoteOutput> {
    return this.addVotesService.removeAddVote(
      user.userVote,
      removeAddVoteInput,
    );
  }
}
