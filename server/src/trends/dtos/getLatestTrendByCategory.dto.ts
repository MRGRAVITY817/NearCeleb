import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/core.dto';
import { Trend } from 'src/trends/entities/trend.entity';

@InputType()
export class GetLatestTrendByCategoryInput extends PickType(Trend, [
  'category',
]) {}

@ObjectType()
export class GetLatestTrendByCategoryOutput extends CoreOutput {
  @Field(type => Trend, { nullable: true })
  trend?: Trend;
}
