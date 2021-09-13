import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/core.dto';

@ObjectType()
export class DeleteAllFollowsOutput extends CoreOutput {}
