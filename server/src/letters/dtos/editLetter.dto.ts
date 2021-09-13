import { InputType, ObjectType, PartialType, PickType } from '@nestjs/graphql';
import { Letter } from '../entities/letter.entity';
import { CoreOutput } from '../../common/dtos/core.dto';

@InputType()
export class EditLetterInput extends PartialType(
  PickType(Letter, ['id', 'celeb', 'status', 'contents']),
) {}
@ObjectType()
export class EditLetterOutput extends CoreOutput {}
