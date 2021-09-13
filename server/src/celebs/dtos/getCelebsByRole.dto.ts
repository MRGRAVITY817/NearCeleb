import {
  Field,
  InputType,
  ObjectType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/core.dto';
import { CelebInfo } from '../entities/celebInfo.entity';
import { Roles } from '../entities/roles.entity';

@InputType()
export class GetCelebsByRoleInput extends PartialType(
  OmitType(Roles, ['id', 'createdAt', 'updatedAt', 'celebInfo']),
) {}

@ObjectType()
export class GetCelebsByRoleOutput extends CoreOutput {
  @Field(type => [CelebInfo], { nullable: true })
  celebInfo?: CelebInfo[];
}
