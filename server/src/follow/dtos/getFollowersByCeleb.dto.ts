import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/core.dto';
import { User } from 'src/users/entities/user.entity';

@InputType()
export class GetFollowersByCelebInput {
  @Field(type => Number)
  celebId: number;
}

@ObjectType()
export class GetFollowersByCelebOutput extends CoreOutput {
  @Field(type => [User], { nullable: true })
  followers?: User[];

  @Field(type => Number, { nullable: true })
  followersCount?: number;
}
