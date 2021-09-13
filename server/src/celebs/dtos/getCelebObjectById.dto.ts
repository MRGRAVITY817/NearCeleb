import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/core.dto';
import { Celeb } from '../entities/celeb.entity';

@InputType()
export class GetCelebObjectByIdInput {
  @Field(type => Number)
  @IsNumber()
  id: number;
}

@ObjectType()
export class GetCelebObjectByIdOutput extends CoreOutput {
  @Field(type => Celeb, { nullable: true })
  celeb?: Celeb;
}
