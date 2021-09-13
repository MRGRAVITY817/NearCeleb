import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/core.dto';
import { Trend } from 'src/trends/entities/trend.entity';

@InputType()
export class EditTrendInput extends PickType(Trend, [
  'id',
  'korTitle',
  'engTitle',
  'coverImage',
  'description',
  'trailer',
  'mainImage',
  'category',
  'issueDate',
]) {
  @Field(type => [Number], { nullable: true })
  castIds?: number[];
}

@ObjectType()
export class EditTrendOutput extends CoreOutput {}
