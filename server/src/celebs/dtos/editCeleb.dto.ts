import { InputType, ObjectType, PartialType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/core.dto';
import { CelebInfo } from '../entities/celebInfo.entity';

@InputType()
export class EditCelebInput extends PartialType(CelebInfo) {}

@ObjectType()
export class EditCelebOutput extends CoreOutput {}
