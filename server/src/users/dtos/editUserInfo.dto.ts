import { InputType, ObjectType, PartialType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/core.dto';
import { UserInfo } from '../entities/userInfo.entity';

@InputType()
export class EditUserInfoInput extends PartialType(UserInfo) {}

@ObjectType()
export class EditUserInfoOutput extends CoreOutput {}
