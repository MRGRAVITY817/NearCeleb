import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/core.dto';
import { Letter } from '../entities/letter.entity';

@InputType()
export class DeleteLetterInput extends PickType(Letter, ['id']) {}

@ObjectType()
export class DeleteLetterOutput extends CoreOutput {}
