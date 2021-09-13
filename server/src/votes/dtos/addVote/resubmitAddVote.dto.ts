import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/core.dto';

@InputType()
export class ResubmitAddVoteInput {
  @Field(type => Number)
  id: number;
}

@ObjectType()
export class ResubmitAddVoteOutput extends CoreOutput {}
