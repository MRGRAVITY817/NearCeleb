import { Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/core.dto';
import { UserInfo } from '../entities/userInfo.entity';

@ObjectType()
export class GetAllUsersInfoOutput extends CoreOutput {
  @Field(type => [UserInfo], { nullable: true })
  usersInfo?: UserInfo[];
}
