import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Letter } from '../entities/letter.entity';
import { CoreOutput } from '../../common/dtos/core.dto';

@InputType()
export class LoadLetterInput {}

@ObjectType()
export class LoadLetterOutput extends CoreOutput {
  @Field(type => Letter, { nullable: true })
  letter?: Letter;
}
