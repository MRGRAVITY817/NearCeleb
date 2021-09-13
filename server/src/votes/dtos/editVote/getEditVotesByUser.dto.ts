import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { PaginatedInput, PaginatedOutput } from 'src/common/dtos/paginated.dto';
import { EditVote } from 'src/votes/entities/editVote.entity';

@InputType()
export class GetEditVotesByUserInput extends PaginatedInput {}

@ObjectType()
export class GetEditVotesByUserOutput extends PaginatedOutput {
  @Field(type => [EditVote], { nullable: true })
  editVotes?: EditVote[];
}
