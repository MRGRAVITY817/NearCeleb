import {
  Field,
  InputType,
  ObjectType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { Letter } from '../entities/letter.entity';
import { CoreOutput } from '../../common/dtos/core.dto';

@InputType()
export class GetLettersByUserInput extends PartialType(
  PickType(Letter, ['createdAt', 'updatedAt']),
) {}

@ObjectType()
export class GetLettersByUserOutput extends CoreOutput {
  @Field(type => [Letter], { nullable: true })
  letters?: Letter[];
}
