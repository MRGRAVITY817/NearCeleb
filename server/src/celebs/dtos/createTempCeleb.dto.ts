import { Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/core.dto';
import { Celeb } from '../entities/celeb.entity';

@ObjectType()
export class CreateTempCelebOutput extends CoreOutput {
  @Field(type => Celeb, { nullable: true })
  celeb?: Celeb;
}
