import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CelebVote } from 'src/celebs/entities/celebVote.entity';
import { UserVote } from 'src/users/entities/userVote.entity';
import { Repository } from 'typeorm';
import {
  CancelEditVoteInput,
  CancelEditVoteOutput,
  CreateEditVoteInput,
  CreateEditVoteOutput,
  GetAllEditVotesOutput,
  GetEditVotesByCelebInput,
  GetEditVotesByCelebOutput,
  GetEditVotesByUserInput,
  GetEditVotesByUserOutput,
} from '../dtos/editVote';
import { EditVote } from '../entities/editVote.entity';
import { VoteStatus } from '../enums/voteStatus.enum';

@Injectable()
export class EditVotesService {
  constructor(
    @InjectRepository(EditVote)
    private readonly editVotes: Repository<EditVote>,
    @InjectRepository(CelebVote)
    private readonly celebVotes: Repository<CelebVote>,
  ) {}

  async createEditVote(
    userVote: UserVote,
    { save, celebId, ...createEditVoteInput }: CreateEditVoteInput,
  ): Promise<CreateEditVoteOutput> {
    try {
      const celebVote = await this.celebVotes.findOne({ where: { celebId } });
      if (!celebVote) {
        return {
          ok: false,
          error: 'Celeb vote not found',
        };
      }
      await this.editVotes.save(
        this.editVotes.create({
          userVote,
          celebVote,
          agreed: 0,
          status: save ? VoteStatus.Pending : VoteStatus.Voting,
          info: createEditVoteInput,
        }),
      );
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Cannot create edit-vote',
      };
    }
  }
  async getAllEditVotes(): Promise<GetAllEditVotesOutput> {
    try {
      const editVotes = await this.editVotes.find();
      return {
        ok: true,
        editVotes,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Cannot get edit-votes',
      };
    }
  }
  async getEditVotesByUser(
    userVote: UserVote,
    { page, itemsPerPage }: GetEditVotesByUserInput,
  ): Promise<GetEditVotesByUserOutput> {
    try {
      const [editVotes, totalResults] = await this.editVotes.findAndCount({
        skip: (page - 1) * itemsPerPage,
        take: itemsPerPage,
        order: { updatedAt: 'DESC' },
        where: {
          userVote,
        },
      });
      return {
        ok: true,
        pages: Math.ceil(totalResults / itemsPerPage),
        totalResults,
        editVotes,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Cannot get user edit-votes',
      };
    }
  }
  async getEditVotesByCeleb({
    celebVoteId,
    page,
    itemsPerPage,
  }: GetEditVotesByCelebInput): Promise<GetEditVotesByCelebOutput> {
    try {
      const [editVotes, totalResults] = await this.editVotes.findAndCount({
        skip: (page - 1) * itemsPerPage,
        take: itemsPerPage,
        order: { updatedAt: 'DESC' },
        where: {
          celebVoteId,
        },
      });
      return {
        ok: true,
        pages: Math.ceil(totalResults / itemsPerPage),
        totalResults,
        editVotes,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Cannot get user edit-votes',
      };
    }
  }
  async cancelEditVote(
    userVote: UserVote,
    { id, remove }: CancelEditVoteInput,
  ): Promise<CancelEditVoteOutput> {
    try {
      const editVote = await this.editVotes.findOneOrFail(id);
      if (!editVote.isMine(userVote.userId)) {
        return {
          ok: false,
          error: 'Unauthorized request',
        };
      }
      if (!remove) {
        editVote.status = VoteStatus.Pending;
        await this.editVotes.save(editVote);
        return {
          ok: true,
        };
      }
      await this.editVotes.delete(editVote);
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: true,
        error: 'Cannot cancel edit-vote',
      };
    }
  }
}
