import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/core.dto';
import { AddVote } from '../../entities/addVote.entity';

@InputType()
export class RemoveAddVoteInput extends PickType(AddVote, ['id']) {}

@ObjectType()
export class RemoveAddVoteOutput extends CoreOutput {}
