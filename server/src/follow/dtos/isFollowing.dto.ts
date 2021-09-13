import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/core.dto';

@InputType()
export class IsFollowingInput {
  @Field(type => Number)
  celebId: number;
}

@ObjectType()
export class IsFollowingOutput extends CoreOutput {
  @Field(type => Boolean, { nullable: true })
  isFollowing?: boolean;
}
