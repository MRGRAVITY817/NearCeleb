import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/core.dto';
import { CelebInfo } from '../entities/celebInfo.entity';

@InputType()
export class CheckIfCelebExistsInput extends PickType(CelebInfo, [
  'korName',
  'engName',
  'birthDate',
]) {}

@ObjectType()
export class CheckIfCelebExistsOutput extends CoreOutput {}
