import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/core.dto';

@InputType()
export class CreateDeleteVoteInput {
  @Field(type => Number)
  celebId: number;

  @Field(type => String)
  reason: string;
}

@ObjectType()
export class CreateDeleteVoteOutput extends CoreOutput {}
