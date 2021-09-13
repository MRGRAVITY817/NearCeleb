import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/core.dto';
import { CelebInfo } from '../entities/celebInfo.entity';

@InputType()
export class SearchCelebByNameInput {
  @Field(type => String)
  query: string;
}

@ObjectType()
export class SearchCelebByNameOutput extends CoreOutput {
  @Field(type => [CelebInfo], { nullable: true })
  celebInfo?: CelebInfo[];
}
