import {
  Field,
  InputType,
  ObjectType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';
import { IsNumber } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/core.dto';
import { CelebInfo } from '../entities/celebInfo.entity';
import { Roles } from '../entities/roles.entity';

@InputType()
export class SearchCelebsByMonthInput extends PartialType(
  OmitType(Roles, ['id', 'createdAt', 'updatedAt', 'celebInfo']),
) {
  @Field(type => String)
  query: string;

  @Field(type => Number)
  @IsNumber()
  month: number;

  @Field(type => Number)
  @IsNumber()
  page: number;
}

@ObjectType()
export class SearchCelebsByMonthOutput extends CoreOutput {
  @Field(type => [CelebInfo], { nullable: true })
  celebInfo?: CelebInfo[];

  @Field(type => Number, { nullable: true })
  pages?: number;
}
