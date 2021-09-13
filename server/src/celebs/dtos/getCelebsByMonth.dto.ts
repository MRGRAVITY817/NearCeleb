import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/core.dto';
import { CelebInfo } from '../entities/celebInfo.entity';

@InputType()
export class GetCelebsByMonthInput {
  @Field(type => Number)
  @IsNumber()
  month: number;
}

@ObjectType()
export class GetCelebsByMonthOutput extends CoreOutput {
  @Field(type => [CelebInfo], { nullable: true })
  celebInfo?: CelebInfo[];
}
