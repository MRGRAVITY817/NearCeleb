import { InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/core.dto';

@ObjectType()
export class DeleteAllLettersOutput extends CoreOutput {}
