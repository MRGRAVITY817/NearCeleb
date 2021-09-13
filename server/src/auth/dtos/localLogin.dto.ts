import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/core.dto';
import { UserInfo } from 'src/users/entities/userInfo.entity';

@InputType()
export class LocalLoginInput extends PickType(UserInfo, ['email']) {}

@ObjectType()
export class LocalLoginOutput extends CoreOutput {
  @Field(type => String, { nullable: true })
  token?: string;
}
