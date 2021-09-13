import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from './core.dto';

@InputType()
export class PaginatedInput {
  @Field(type => Number)
  itemsPerPage: number;

  @Field(type => Number)
  page: number;
}

@ObjectType()
export class PaginatedOutput extends CoreOutput {
  @Field(type => Number, { nullable: true })
  pages?: number;

  @Field(type => Number, { nullable: true })
  totalResults?: number;
}
