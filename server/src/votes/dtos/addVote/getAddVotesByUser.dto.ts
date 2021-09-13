import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { PaginatedInput, PaginatedOutput } from 'src/common/dtos/paginated.dto';
import { AddVote } from '../../entities/addVote.entity';

@InputType()
export class GetAddVotesByUserInput extends PaginatedInput {}

@ObjectType()
export class GetAddVotesByUserOutput extends PaginatedOutput {
  @Field(type => [AddVote], { nullable: true })
  addVotes?: AddVote[];
}
