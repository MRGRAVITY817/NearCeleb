import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column } from 'typeorm';
import { VoteStatus } from '../enums/voteStatus.enum';

@InputType('VoteInputType', { isAbstract: true })
@ObjectType()
export class Vote extends CoreEntity {
  @Column()
  @Field(type => Number, { defaultValue: 0 })
  @IsNumber()
  agreed: number;

  @Column({ type: 'enum', enum: VoteStatus })
  @Field(type => VoteStatus, { defaultValue: VoteStatus.Pending })
  status: VoteStatus;
}
