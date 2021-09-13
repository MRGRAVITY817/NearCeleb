import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/core.dto';
import { Trend } from 'src/trends/entities/trend.entity';

@InputType()
export class GetTrendByIdInput extends PickType(Trend, ['id']) {}

@ObjectType()
export class GetTrendByIdOutput extends CoreOutput {
  @Field(type => Trend, { nullable: true })
  trend?: Trend;
}
