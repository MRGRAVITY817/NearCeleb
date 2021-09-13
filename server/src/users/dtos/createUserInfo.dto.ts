import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/core.dto';
import { UserInfo } from '../entities/userInfo.entity';

@InputType()
export class CreateUserInfoInput extends PickType(UserInfo, [
  'email',
  'userName',
]) {}

@ObjectType()
export class CreateUserInfoOutput extends CoreOutput {
  @Field(type => UserInfo, { nullable: true })
  userInfo?: UserInfo;
}
