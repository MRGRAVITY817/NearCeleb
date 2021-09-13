import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/core.dto';
import { AddVote } from '../../entities/addVote.entity';
import { DeleteVote } from '../../entities/deleteVote.entity';
import { EditVote } from '../../entities/editVote.entity';

@InputType()
export class GetVotesByCelebInput {
  @Field(type => Number)
  celebId: number;
}

@ObjectType()
export class GetVotesByCelebOutput extends CoreOutput {
  @Field(type => [AddVote], { nullable: true })
  addVotes?: AddVote[];

  @Field(type => [EditVote], { nullable: true })
  editVotes?: EditVote[];

  @Field(type => [DeleteVote], { nullable: true })
  deleteVotes?: DeleteVote[];
}
