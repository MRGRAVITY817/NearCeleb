import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/core.dto';
import { Celeb } from '../entities/celeb.entity';

@InputType()
export class DeleteCelebInput extends PickType(Celeb, ['id']) {}

@ObjectType()
export class DeleteCelebOutput extends CoreOutput {}
