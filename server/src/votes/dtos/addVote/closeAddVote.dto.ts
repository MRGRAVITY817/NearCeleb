import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/core.dto';

@InputType()
export class CloseAddVoteInput {
  @Field(type => Number)
  id: number;
}

@ObjectType()
export class CloseAddVoteOutput extends CoreOutput {}
