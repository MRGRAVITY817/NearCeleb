import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsDate, IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, JoinColumn, OneToOne, RelationId } from 'typeorm';
import { Gender } from '../enums/gender.enum';
import { Nationality } from '../enums/Nationality.enum';
import { Celeb } from './celeb.entity';
import { Roles } from './roles.entity';
import { Social } from './social.entity';

@InputType('CelebInfoInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class CelebInfo extends CoreEntity {
  @OneToOne(type => Celeb, celeb => celeb.celebInfo)
  @Field(type => Celeb)
  celeb: Celeb;

  @RelationId((celebInfo: CelebInfo) => celebInfo.celeb)
  celebId: number;

  @Column()
  @Field(type => String)
  @IsString()
  korName: string;

  @Column()
  @Field(type => String)
  @IsString()
  engName: string;

  @Column({ nullable: true })
  @Field(type => String, { nullable: true })
  @IsString()
  realName?: string;

  @Column({ type: 'enum', enum: Gender })
  @Field(type => Gender)
  gender: Gender;

  @Column({ nullable: true })
  @Field(type => String, { nullable: true })
  profileImage?: string;

  @Column({ nullable: true })
  @Field(type => String, { nullable: true })
  secondImage?: string;

  @Column({ nullable: true })
  @Field(type => String, { nullable: true })
  bgImage?: string;

  @Column({ nullable: true })
  @Field(type => Date, { nullable: true })
  @IsDate()
  birthDate?: Date;

  @Column({ nullable: true })
  @Field(type => Date, { nullable: true })
  @IsDate()
  debutDate?: Date;

  @Column({ type: 'enum', enum: Nationality })
  @Field(type => Nationality)
  nationality: Nationality;

  @Column({ nullable: true })
  @Field(type => String, { nullable: true })
  description?: string;

  @OneToOne(type => Roles, roles => roles.celebInfo, {
    cascade: true,
    nullable: true,
    eager: true,
  })
  @JoinColumn()
  @Field(type => Roles)
  roles: Roles;

  @OneToOne(type => Social, social => social.celebInfo, {
    nullable: true,
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  @Field(type => Social, { nullable: true })
  social?: Social;

  @Column({ nullable: true })
  @Field(type => String, { nullable: true })
  company?: string;

  @Column({ nullable: true })
  @Field(type => String, { nullable: true })
  companyWebsite?: string;

  @Column({ nullable: true })
  @Field(type => String, { nullable: true })
  group?: string;

  @Column({ nullable: true })
  @Field(type => String, { nullable: true })
  fandom?: string;

  @Column({ nullable: true })
  @Field(type => String, { nullable: true })
  fandomIcon?: string;
}
