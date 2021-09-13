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
export class WriteLetterInput extends PartialType(
  PickType(Letter, ['contents', 'style', 'previewImage']),
) {
  @Field(type => Number, { nullable: true })
  celebId?: number;
}
@ObjectType()
export class WriteLetterOutput extends CoreOutput {}
