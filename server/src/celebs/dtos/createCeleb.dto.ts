import { InputType, ObjectType, PartialType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/core.dto';
import { CelebInfo } from '../entities/celebInfo.entity';

@InputType()
export class CreateCelebInput extends PartialType(CelebInfo) {}

@ObjectType()
export class CreateCelebOutput extends CoreOutput {}
