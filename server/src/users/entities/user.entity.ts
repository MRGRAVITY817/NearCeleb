import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsBoolean } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { Letter } from 'src/letters/entities/letter.entity';
import { Payment } from 'src/payments/entities/payment.entity';
import { Font } from 'src/fonts/entities/fonts.entity';
import { Follow } from 'src/follow/entities/follow.entity';
import { UserInfo } from './userInfo.entity';
import { UserVote } from './userVote.entity';

@InputType('UserInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class User extends CoreEntity {
  @Field(type => UserInfo, { nullable: true })
  @OneToOne(type => UserInfo, userInfo => userInfo.user, {
    cascade: true,
    nullable: true,
    eager: true,
  })
  @JoinColumn()
  userInfo?: UserInfo;

  @Field(type => UserVote, { nullable: true })
  @OneToOne(type => UserVote, userVote => userVote.user, {
    cascade: true,
    nullable: true,
    eager: true,
  })
  @JoinColumn()
  userVote?: UserVote;

  @Column({ default: false })
  @Field(type => Boolean, { defaultValue: false })
  @IsBoolean()
  verified: boolean;

  @Field(type => [Follow], { defaultValue: [] })
  @OneToMany(type => Follow, follow => follow.user, { cascade: true })
  following: Follow[];

  @Field(type => [Letter], { nullable: true })
  @OneToMany(type => Letter, letter => letter.user, { nullable: true })
  letters?: Letter[];

  @Field(type => [Font], { nullable: true })
  @OneToMany(type => Font, font => font.creator, { nullable: true })
  createdFonts?: Font[];

  @Field(type => [Payment], { nullable: true })
  @OneToMany(type => Payment, payment => payment.user, { nullable: true })
  payments?: Payment[];
}
