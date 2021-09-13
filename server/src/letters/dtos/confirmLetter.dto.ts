import { InputType, ObjectType, PartialType, PickType } from '@nestjs/graphql';
import { Letter } from '../entities/letter.entity';
import { CoreOutput } from '../../common/dtos/core.dto';

@InputType()
export class ConfirmLetterInput extends PartialType(PickType(Letter, ['id'])) {}

@ObjectType()
export class ConfirmLetterOutput extends CoreOutput {}
