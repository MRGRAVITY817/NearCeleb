import { Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/core.dto';
import { AddVote } from '../../entities/addVote.entity';
import { DeleteVote } from '../../entities/deleteVote.entity';
import { EditVote } from '../../entities/editVote.entity';

@ObjectType()
export class GetVotesByUserOutput extends CoreOutput {
  @Field(type => [AddVote], { nullable: true })
  addVotes?: AddVote[];

  @Field(type => [EditVote], { nullable: true })
  editVotes?: EditVote[];

  @Field(type => [DeleteVote], { nullable: true })
  deleteVotes?: DeleteVote[];
}
