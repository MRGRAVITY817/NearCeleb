import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/core.dto';
import { CelebInfo } from '../entities/celebInfo.entity';

@InputType()
export class GetAllCelebsPaginatedInput {
  @Field(type => Number)
  @IsNumber()
  itemsPerPage: number;

  @Field(type => Number)
  @IsNumber()
  page: number;
}

@ObjectType()
export class GetAllCelebsPaginatedOutput extends CoreOutput {
  @Field(type => [CelebInfo], { nullable: true })
  celebInfo?: CelebInfo[];

  @Field(type => Number, { nullable: true })
  @IsNumber()
  totalPages?: number;

  @Field(type => Number, { nullable: true })
  @IsNumber()
  totalResults?: number;
}
