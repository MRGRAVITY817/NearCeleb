import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/core.dto';
import { UserInfo } from '../entities/userInfo.entity';

@InputType()
export class DeleteUserInfoInput extends PickType(UserInfo, ['id']) {}
@ObjectType()
export class DeleteUserInfoOutput extends CoreOutput {}
