import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { PaginatedInput, PaginatedOutput } from 'src/common/dtos/paginated.dto';
import { EditVote } from 'src/votes/entities/editVote.entity';

@InputType()
export class GetEditVotesByCelebInput extends PaginatedInput {
  @Field(type => Number)
  celebVoteId: number;
}

@ObjectType()
export class GetEditVotesByCelebOutput extends PaginatedOutput {
  @Field(type => [EditVote], { nullable: true })
  editVotes?: EditVote[];
}
