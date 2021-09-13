import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/core.dto';
import { CelebInfo } from '../entities/celebInfo.entity';

@InputType()
export class GetCelebByIdInput {
  @Field(type => Number)
  celebId: number;
}

@ObjectType()
export class GetCelebByIdOutput extends CoreOutput {
  @Field(type => CelebInfo, { nullable: true })
  celebInfo?: CelebInfo;
}
