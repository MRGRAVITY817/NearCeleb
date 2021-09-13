import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/core.dto';
import { User } from '../entities/user.entity';

@InputType()
export class GetUserByIdInput extends PickType(User, ['id']) {}

@ObjectType()
export class GetUserByIdOutput extends CoreOutput {
  @Field(type => User, { nullable: true })
  user?: User;
}
