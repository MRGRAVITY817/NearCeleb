import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/core.dto';
import { EditVoteItem } from 'src/votes/entities/editVoteItem.entity';

@InputType()
export class CreateEditVoteInput extends EditVoteItem {
  @Field(type => Number)
  celebId: number;

  @Field(type => Boolean, { defaultValue: false })
  save: boolean;
}

@ObjectType()
export class CreateEditVoteOutput extends CoreOutput {}
