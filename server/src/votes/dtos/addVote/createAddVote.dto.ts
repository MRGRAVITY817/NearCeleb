import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/core.dto';
import { AddVoteItem } from 'src/votes/entities/addVoteItem.entity';

@InputType()
export class CreateAddVoteInput extends AddVoteItem {
  @Field(type => Boolean, { defaultValue: false })
  save: boolean;
}

@ObjectType()
export class CreateAddVoteOutput extends CoreOutput {}
