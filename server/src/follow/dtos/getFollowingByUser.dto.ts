import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { Celeb } from 'src/celebs/entities/celeb.entity';
import { CoreOutput } from 'src/common/dtos/core.dto';

@InputType()
export class GetFollowingByUserInput {
  @Field(type => Number)
  userId: number;
}

@ObjectType()
export class GetFollowingByUserOutput extends CoreOutput {
  @Field(type => [Celeb], { nullable: true })
  following?: Celeb[];

  @Field(type => Number, { nullable: true })
  followingCount?: number;
}
