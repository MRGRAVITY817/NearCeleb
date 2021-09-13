import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { IsDate, IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, OneToOne, RelationId } from 'typeorm';
import { User } from './user.entity';

export enum UserRole {
  Fans = 'Fans',
  Admin = 'Admin',
}

registerEnumType(UserRole, { name: 'UserRole' });

@InputType('UserInfoInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class UserInfo extends CoreEntity {
  @OneToOne(type => User, user => user.userInfo)
  @Field(type => User)
  user: User;

  @RelationId((userInfo: UserInfo) => userInfo.user)
  userId: number;

  @Column()
  @Field(type => String, { nullable: true })
  @IsString()
  userName: string;

  @Column({ unique: true })
  @Field(type => String, { nullable: true })
  @IsString()
  email: string;

  @Column({ nullable: true })
  @Field(type => String, { nullable: true })
  @IsString()
  profileImage?: string;

  @Column({ nullable: true })
  @Field(type => String, { nullable: true })
  @IsString()
  coverImage?: string;

  @Column({ nullable: true })
  @Field(type => String, { nullable: true })
  @IsString()
  signature?: string;

  @Column({ nullable: true })
  @Field(type => String, { nullable: true })
  @IsString()
  profileState?: string;

  @Column({ nullable: true })
  @Field(type => String, { nullable: true })
  @IsString()
  description?: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.Fans,
    nullable: true,
  })
  @Field(type => UserRole, { nullable: true })
  role?: UserRole;

  @Column({ nullable: true })
  @Field(type => Date, { nullable: true })
  @IsDate()
  birthDate?: Date;
}
