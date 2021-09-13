import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { AddVote } from 'src/votes/entities/addVote.entity';
import { EditVote } from 'src/votes/entities/editVote.entity';
import { Column, Entity, OneToOne } from 'typeorm';
import { CelebInfo } from './celebInfo.entity';

@InputType('SocialInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Social extends CoreEntity {
  @OneToOne(type => CelebInfo, celebInfo => celebInfo.social, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @Field(type => CelebInfo, { nullable: true })
  celebInfo?: CelebInfo;

  @Column({ nullable: true })
  @Field(type => String, { nullable: true })
  instagram?: string;

  @Column({ nullable: true })
  @Field(type => String, { nullable: true })
  facebook?: string;

  @Column({ nullable: true })
  @Field(type => String, { nullable: true })
  twitter?: string;

  @Column({ nullable: true })
  @Field(type => String, { nullable: true })
  youtube?: string;

  @Column({ nullable: true })
  @Field(type => String, { nullable: true })
  twitch?: string;

  @Column({ nullable: true })
  @Field(type => String, { nullable: true })
  tiktok?: string;

  @Column({ nullable: true })
  @Field(type => String, { nullable: true })
  website?: string;
}
