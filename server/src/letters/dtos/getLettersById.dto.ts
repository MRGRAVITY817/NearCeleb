import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { Letter } from '../entities/letter.entity';
import { CoreOutput } from '../../common/dtos/core.dto';

@InputType()
export class GetLetterByIdInput extends PickType(Letter, ['id']) {}

@ObjectType()
export class GetLetterByIdOutput extends CoreOutput {
  @Field(type => Letter, { nullable: true })
  letter?: Letter;
}
