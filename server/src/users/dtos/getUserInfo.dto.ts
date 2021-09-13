import {
  Field,
  InputType,
  ObjectType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/core.dto';
import { UserInfo } from '../entities/userInfo.entity';

@InputType()
export class GetUserInfoInput extends PartialType(
  PickType(UserInfo, ['id', 'email']),
) {}

@ObjectType()
export class GetUserInfoOutput extends CoreOutput {
  @Field(type => UserInfo, { nullable: true })
  userInfo?: UserInfo;
}
