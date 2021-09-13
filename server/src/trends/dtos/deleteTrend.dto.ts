import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/core.dto';
import { Trend } from 'src/trends/entities/trend.entity';

@InputType()
export class DeleteTrendInput extends PickType(Trend, ['id']) {}

@ObjectType()
export class DeleteTrendOutput extends CoreOutput {}
