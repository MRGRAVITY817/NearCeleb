import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/core.dto';
import { Follow } from '../entities/follow.entity';

@InputType()
export class ToggleFollowInput {
  @Field(type => Number)
  celebId: number;
}

@ObjectType()
export class ToggleFollowOutput extends CoreOutput {
  @Field(type => Boolean, { nullable: true })
  isFollowing?: boolean;
}
