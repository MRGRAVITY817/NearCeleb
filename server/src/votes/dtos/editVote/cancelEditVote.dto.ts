import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/core.dto';

@InputType()
export class CancelEditVoteInput {
  @Field(type => Number)
  id: number;

  @Field(type => Boolean, { defaultValue: false })
  remove: boolean;
}

@ObjectType()
export class CancelEditVoteOutput extends CoreOutput {}
