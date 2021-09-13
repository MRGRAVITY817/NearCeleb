import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CelebsService } from 'src/celebs/celebs.service';
import { Roles } from 'src/celebs/entities/roles.entity';
import { Social } from 'src/celebs/entities/social.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateEditVoteInput, CreateEditVoteOutput } from '../dtos/editVote';
import {
  GetVotesByCelebInput,
  GetVotesByCelebOutput,
  GetVotesByUserOutput,
} from '../dtos/general';
import { AddVote } from '../entities/addVote.entity';
import { DeleteVote } from '../entities/deleteVote.entity';
import { EditVote } from '../entities/editVote.entity';

@Injectable()
export class VotesService {
  constructor(
    @InjectRepository(AddVote)
    private readonly addVotes: Repository<AddVote>,
    @InjectRepository(EditVote)
    private readonly editVotes: Repository<EditVote>,
    @InjectRepository(DeleteVote)
    private readonly deleteVotes: Repository<DeleteVote>,
    @InjectRepository(Roles)
    private readonly roles: Repository<Roles>,
    @InjectRepository(Social)
    private readonly social: Repository<Social>,
    private readonly celebsService: CelebsService,
  ) {}

  async getVotesByCeleb({
    celebId,
  }: GetVotesByCelebInput): Promise<GetVotesByCelebOutput> {
    try {
      const addVotes = await this.addVotes.find({ where: { celebId } });
      const editVotes = await this.editVotes.find({ where: { celebId } });
      const deleteVotes = await this.deleteVotes.find({ where: { celebId } });
      return {
        ok: true,
        addVotes,
        editVotes,
        deleteVotes,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Cannot get votes',
      };
    }
  }

  async getVotesByUser(user: User): Promise<GetVotesByUserOutput> {
    try {
      const addVotes = await this.addVotes.find({ where: { user } });
      const editVotes = await this.editVotes.find({ where: { user } });
      const deleteVotes = await this.deleteVotes.find({ where: { user } });
      return {
        ok: true,
        addVotes,
        editVotes,
        deleteVotes,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Cannot get votes',
      };
    }
  }

  async createEditVote(
    user: User,
    { celebId, ...createEditVoteInput }: CreateEditVoteInput,
  ): Promise<CreateEditVoteOutput> {
    try {
      const inputArray = Object.entries(createEditVoteInput);
      // Check if user is trying to edit more than one field of celeb info
      if (inputArray.length !== 2) {
        return {
          ok: false,
          error: 'You should update one info per request',
        };
      }
      // Check if user already has a edit-vote about that field
      console.log(inputArray);
      const { ok, error, celeb } = await this.celebsService.getCelebObjectById({
        id: celebId,
      });
      if (!ok) return { ok, error };
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Cannot create edit vote',
      };
    }
  }
}
