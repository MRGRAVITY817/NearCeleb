import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/core.dto';
import { AddVote } from '../../entities/addVote.entity';

@InputType()
export class GetAddVoteByIdInput extends PickType(AddVote, ['id']) {}

@ObjectType()
export class GetAddVoteByIdOutput extends CoreOutput {
  @Field(type => AddVote, { nullable: true })
  addVote?: AddVote;
}
