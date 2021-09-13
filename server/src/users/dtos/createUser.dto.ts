import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/core.dto';
import { UserInfo } from '../entities/userInfo.entity';

@InputType()
export class CreateUserInput extends PickType(UserInfo, [
  'email',
  'userName',
]) {}

@ObjectType()
export class CreateUserOutput extends CoreOutput {}
