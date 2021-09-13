import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/core.dto';
import { User } from '../entities/user.entity';

@InputType()
export class DeleteUserInput extends PickType(User, ['id']) {}

@ObjectType()
export class DeleteUserOutput extends CoreOutput {}
