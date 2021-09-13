import {
  Field,
  InputType,
  ObjectType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/core.dto';
import { CelebInfo } from '../entities/celebInfo.entity';
import { Roles } from '../entities/roles.entity';

@InputType()
export class SearchCelebsInput extends PartialType(
  OmitType(Roles, ['id', 'createdAt', 'updatedAt', 'celebInfo']),
) {
  @Field(type => String)
  query: string;

  @Field(type => Number)
  page: number;
}

@ObjectType()
export class SearchCelebsOutput extends CoreOutput {
  @Field(type => [CelebInfo], { nullable: true })
  celebInfo?: CelebInfo[];

  @Field(type => Number, { nullable: true })
  pages?: number;
}
