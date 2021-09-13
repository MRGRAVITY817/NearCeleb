import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/core.dto';
import { Vote } from '../../entities/vote.entity';

@InputType()
export class DeleteVoteInput extends PickType(Vote, ['id']) {}

@ObjectType()
export class DeleteVoteOutput extends CoreOutput {}
