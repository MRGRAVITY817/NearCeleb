import { Field, ObjectType } from '@nestjs/graphql';
import { Letter } from '../entities/letter.entity';
import { CoreOutput } from '../../common/dtos/core.dto';

@ObjectType()
export class GetAllLettersOutput extends CoreOutput {
  @Field(type => [Letter], { nullable: true })
  letters?: Letter[];
}
