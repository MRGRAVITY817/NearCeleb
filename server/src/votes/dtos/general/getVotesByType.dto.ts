import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/core.dto';
import { VoteType } from '../../enums/voteType.enum';
import { AddVote } from '../../entities/addVote.entity';
import { DeleteVote } from '../../entities/deleteVote.entity';
import { EditVote } from '../../entities/editVote.entity';
import { IsNumber } from 'class-validator';

@InputType()
export class GetVotesByTypeInput {
  @Field(type => VoteType)
  voteType: VoteType;

  @Field(type => Number)
  @IsNumber()
  itemsPerPage: number;

  @Field(type => Number)
  @IsNumber()
  page: number;
}

@ObjectType()
export class GetVotesByTypeOutput extends CoreOutput {
  @Field(type => [AddVote], { nullable: true })
  addVotes?: AddVote[];

  @Field(type => [EditVote], { nullable: true })
  editVotes?: EditVote[];

  @Field(type => [DeleteVote], { nullable: true })
  deleteVotes?: DeleteVote[];

  @Field(type => Number, { nullable: true })
  @IsNumber()
  totalPages?: number;

  @Field(type => Number, { nullable: true })
  @IsNumber()
  totalResults?: number;
}
