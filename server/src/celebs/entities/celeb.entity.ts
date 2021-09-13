import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import {
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Letter } from 'src/letters/entities/letter.entity';
import { Trend } from 'src/trends/entities/trend.entity';
import { Follow } from 'src/follow/entities/follow.entity';
import { CelebInfo } from './celebInfo.entity';
import { CelebVote } from './celebVote.entity';

@InputType('CelebInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Celeb extends CoreEntity {
  @Field(type => CelebInfo, { nullable: true })
  @OneToOne(type => CelebInfo, celebInfo => celebInfo.celeb, {
    cascade: true,
    nullable: true,
    eager: true,
  })
  @JoinColumn()
  celebInfo?: CelebInfo;

  @Field(type => CelebVote, { nullable: true })
  @OneToOne(type => CelebVote, celebVote => celebVote.celeb, {
    cascade: true,
    nullable: true,
    eager: true,
  })
  @JoinColumn()
  celebVote?: CelebVote;

  @Field(type => [Follow], { defaultValue: [] })
  @ManyToMany(type => Follow, follow => follow.celeb, { cascade: true })
  @JoinTable()
  followers: Follow[];

  @ManyToOne(type => Trend, trend => trend.casts, {
    nullable: true,
  })
  @Field(type => Trend, { nullable: true })
  trend?: Trend;

  @Field(type => [Letter], { defaultValue: [] })
  @OneToMany(type => Letter, letter => letter.celeb)
  @JoinTable()
  letters: Letter[];
}
