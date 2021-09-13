import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CelebsModule } from 'src/celebs/celebs.module';
import { CelebVote } from 'src/celebs/entities/celebVote.entity';
import { Roles } from 'src/celebs/entities/roles.entity';
import { Social } from 'src/celebs/entities/social.entity';
import { AddVote } from './entities/addVote.entity';
import { DeleteVote } from './entities/deleteVote.entity';
import { EditVote } from './entities/editVote.entity';
import { Vote } from './entities/vote.entity';
import { AddVotesResolver } from './resolvers/addVotes.resolver';
import { VotesResolver } from './resolvers/votes.resolver';
import { AddVotesService } from './services/addVotes.service';
import { EditVotesService } from './services/editVotes.service';
import { VotesService } from './services/votes.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AddVote,
      EditVote,
      DeleteVote,
      CelebVote,
      Roles,
      Social,
    ]),
    CelebsModule,
  ],
  providers: [
    VotesResolver,
    VotesService,
    AddVotesService,
    AddVotesResolver,
    EditVotesService,
  ],
  exports: [VotesService],
})
export class VotesModule {}
