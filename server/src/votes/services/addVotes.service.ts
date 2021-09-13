import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserVote } from 'src/users/entities/userVote.entity';
import { Repository } from 'typeorm';
import {
  CancelAddVoteInput,
  CancelAddVoteOutput,
  CloseAddVoteInput,
  CloseAddVoteOutput,
  ConfirmAddVoteInput,
  ConfirmAddVoteOutput,
  CreateAddVoteInput,
  CreateAddVoteOutput,
  GetAddVoteByIdInput,
  GetAddVoteByIdOutput,
  GetAddVotesByUserInput,
  GetAddVotesByUserOutput,
  GetAllAddVotesInput,
  GetAllAddVotesOutput,
  RemoveAddVoteInput,
  RemoveAddVoteOutput,
  ResubmitAddVoteInput,
  ResubmitAddVoteOutput,
} from '../dtos/addVote';
import { AddVote } from '../entities/addVote.entity';
import { VoteStatus } from '../enums/voteStatus.enum';

@Injectable()
export class AddVotesService {
  constructor(
    @InjectRepository(AddVote)
    private readonly addVotes: Repository<AddVote>,
  ) {}

  async createAddVote(
    userVote: UserVote,
    { save, ...createAddVoteInput }: CreateAddVoteInput,
  ): Promise<CreateAddVoteOutput> {
    try {
      await this.addVotes.save(
        this.addVotes.create({
          userVote,
          agreed: 0,
          status: save ? VoteStatus.Pending : VoteStatus.Voting,
          info: createAddVoteInput,
        }),
      );
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Cannot create add-vote',
      };
    }
  }

  async getAddVoteById({
    id,
  }: GetAddVoteByIdInput): Promise<GetAddVoteByIdOutput> {
    try {
      const addVote = await this.addVotes.findOneOrFail(id);
      return {
        ok: true,
        addVote,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Cannot get add-vote by id',
      };
    }
  }

  async getAllAddVotes({
    itemsPerPage,
    page,
  }: GetAllAddVotesInput): Promise<GetAllAddVotesOutput> {
    try {
      const [addVotes, totalResults] = await this.addVotes.findAndCount({
        skip: (page - 1) * itemsPerPage,
        take: itemsPerPage,
        order: {
          updatedAt: 'DESC',
        },
      });
      return {
        ok: true,
        addVotes,
        pages: Math.ceil(totalResults / itemsPerPage),
        totalResults,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Cannot get all add-votes',
      };
    }
  }

  async getAddVotesByUser(
    userVote: UserVote,
    { page, itemsPerPage }: GetAddVotesByUserInput,
  ): Promise<GetAddVotesByUserOutput> {
    try {
      const [addVotes, totalResults] = await this.addVotes.findAndCount({
        skip: (page - 1) * itemsPerPage,
        take: itemsPerPage,
        order: {
          updatedAt: 'DESC',
        },
        where: {
          userVote,
        },
      });
      return {
        ok: true,
        pages: Math.ceil(totalResults / itemsPerPage),
        totalResults,
        addVotes,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Cannot get user add-votes',
      };
    }
  }

  async confirmAddVote({
    id,
  }: ConfirmAddVoteInput): Promise<ConfirmAddVoteOutput> {
    try {
      const addVote = await this.addVotes.findOneOrFail(id);
      addVote.status = VoteStatus.Confirmed;
      await this.addVotes.save(addVote);
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Cannot confirm add-vote',
      };
    }
  }

  async cancelAddVote(
    userVote: UserVote,
    { id, remove }: CancelAddVoteInput,
  ): Promise<CancelAddVoteOutput> {
    try {
      const addVote = await this.addVotes.findOneOrFail(id);
      if (!addVote.isMine(userVote.userId)) {
        return {
          ok: false,
          error: 'Not your add-vote',
        };
      }
      if (!remove) {
        addVote.status = VoteStatus.Pending;
        await this.addVotes.save(addVote);
        return {
          ok: true,
        };
      }
      await this.addVotes.delete(addVote);
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Cannot cancel add-vote',
      };
    }
  }

  async resubmitAddVote(
    userVote: UserVote,
    { id }: ResubmitAddVoteInput,
  ): Promise<ResubmitAddVoteOutput> {
    try {
      const addVote = await this.addVotes.findOneOrFail(id);
      if (!addVote.isMine(userVote.userId)) {
        return {
          ok: false,
          error: 'Not your add-vote',
        };
      }
      addVote.status = VoteStatus.Voting;
      await this.addVotes.save(addVote);
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Cannot resubmit add-vote',
      };
    }
  }

  async removeAddVote(
    userVote: UserVote,
    { id }: RemoveAddVoteInput,
  ): Promise<RemoveAddVoteOutput> {
    try {
      const addVote = await this.addVotes.findOneOrFail(id);
      if (!addVote.isMine(userVote.userId)) {
        return {
          ok: false,
          error: 'Not your add-vote',
        };
      }
      await this.addVotes.delete(addVote);
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Cannot remove add-vote',
      };
    }
  }
  async closeAddVote({ id }: CloseAddVoteInput): Promise<CloseAddVoteOutput> {
    try {
      const addVote = await this.addVotes.findOne(id);
      if (!addVote) {
        return {
          ok: false,
          error: 'Add-vote not found',
        };
      }
      addVote.status = VoteStatus.Closed;
      await this.addVotes.save(addVote);
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Cannot close add-vote',
      };
    }
  }
}
