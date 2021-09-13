import { Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/core.dto';
import { Trend } from 'src/trends/entities/trend.entity';

@ObjectType()
export class GetAllTrendsOutput extends CoreOutput {
  @Field(type => [Trend], { nullable: true })
  trends?: Trend[];
}
