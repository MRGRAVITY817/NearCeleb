import { Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/core.dto';
import { EditVote } from 'src/votes/entities/editVote.entity';

@ObjectType()
export class GetAllEditVotesOutput extends CoreOutput {
  @Field(type => [EditVote], { nullable: true })
  editVotes?: EditVote[];
}
