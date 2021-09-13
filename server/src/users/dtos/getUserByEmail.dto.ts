import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/core.dto';
import { User } from '../entities/user.entity';
import { UserInfo } from '../entities/userInfo.entity';

@InputType()
export class GetUserByEmailInput extends PickType(UserInfo, ['email']) {}

@ObjectType()
export class GetUserByEmailOutput extends CoreOutput {
  @Field(type => User, { nullable: true })
  user?: User;
}
