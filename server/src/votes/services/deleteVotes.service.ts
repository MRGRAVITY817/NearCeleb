import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CelebsService } from 'src/celebs/celebs.service';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import {
  CreateDeleteVoteInput,
  CreateDeleteVoteOutput,
} from '../dtos/deleteVote';
import { DeleteVote } from '../entities/deleteVote.entity';

@Injectable()
export class DeleteVotesService {
  constructor(
    @InjectRepository(DeleteVote)
    private readonly deleteVotes: Repository<DeleteVote>,
    private readonly celebsService: CelebsService,
  ) {}

  async createDeleteVote(
    user: User,
    { celebId, reason }: CreateDeleteVoteInput,
  ): Promise<CreateDeleteVoteOutput> {
    try {
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Cannot create delete vote',
      };
    }
  }
}
