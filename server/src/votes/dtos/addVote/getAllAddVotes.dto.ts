import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { PaginatedInput, PaginatedOutput } from 'src/common/dtos/paginated.dto';
import { AddVote } from '../../entities/addVote.entity';

@InputType()
export class GetAllAddVotesInput extends PaginatedInput {}

@ObjectType()
export class GetAllAddVotesOutput extends PaginatedOutput {
  @Field(type => [AddVote], { nullable: true })
  addVotes?: AddVote[];
}
