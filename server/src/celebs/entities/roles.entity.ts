import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { AddVote } from 'src/votes/entities/addVote.entity';
import { EditVote } from 'src/votes/entities/editVote.entity';
import { Vote } from 'src/votes/entities/vote.entity';
import { Column, Entity, OneToOne } from 'typeorm';
import { CelebInfo } from './celebInfo.entity';

@Entity()
@InputType('CelebRolesInputType', { isAbstract: true })
@ObjectType()
export class Roles extends CoreEntity {
  @OneToOne(type => CelebInfo, celebInfo => celebInfo.roles, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @Field(type => CelebInfo, { nullable: true })
  celebInfo?: CelebInfo;

  @Column({ default: false })
  @Field(type => Boolean, { defaultValue: false })
  actor: boolean;

  @Column({ default: false })
  @Field(type => Boolean, { defaultValue: false })
  artist: boolean;

  @Column({ default: false })
  @Field(type => Boolean, { defaultValue: false })
  comedian: boolean;

  @Column({ default: false })
  @Field(type => Boolean, { defaultValue: false })
  showhost: boolean;

  @Column({ default: false })
  @Field(type => Boolean, { defaultValue: false })
  influencer: boolean;

  @Column({ default: false })
  @Field(type => Boolean, { defaultValue: false })
  sports: boolean;

  @Column({ default: false })
  @Field(type => Boolean, { defaultValue: false })
  author: boolean;
}
