import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { IsEnum } from 'class-validator';
import { Celeb } from 'src/celebs/entities/celeb.entity';
import { CoreEntity } from 'src/common/entities/core.entity';
import { User } from 'src/users/entities/user.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  RelationId,
} from 'typeorm';
import { Contents } from './contents.entity';
import { Style } from './style.entity';

export enum LetterStatusEnum {
  Writing = 'Writing',
  Finished = 'Finished',
  Sending = 'Sending',
  Delivered = 'Delivered',
}

registerEnumType(LetterStatusEnum, { name: 'LetterStatus' });

@InputType('LetterInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Letter extends CoreEntity {
  @ManyToOne(type => User, user => user.letters, {
    onDelete: 'SET NULL',
    nullable: true,
    eager: true,
  })
  user: User;

  @ManyToOne(type => Celeb, celeb => celeb.letters, {
    onDelete: 'SET NULL',
    nullable: true,
    eager: true,
  })
  celeb?: Celeb;

  @RelationId((letter: Letter) => letter.user)
  userId: number;

  @RelationId((letter: Letter) => letter.celeb)
  @Field(type => Number, { nullable: true })
  celebId?: number;

  @Column({
    type: 'enum',
    enum: LetterStatusEnum,
    default: LetterStatusEnum.Writing,
  })
  @Field(type => LetterStatusEnum)
  @IsEnum(LetterStatusEnum)
  status: LetterStatusEnum;

  @Column({ type: 'json', nullable: true })
  @Field(type => Style, { nullable: true })
  style?: Style;

  @Column({ type: 'json', nullable: true })
  @Field(type => Contents, { nullable: true })
  contents?: Contents;

  @Column({ nullable: true })
  @Field(type => Number, { nullable: true })
  price?: number;

  @Column({ nullable: true })
  @Field(type => String, { nullable: true })
  previewImage?: string;
}
