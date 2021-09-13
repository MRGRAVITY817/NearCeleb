import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { IsDate } from 'class-validator';
import { Celeb } from 'src/celebs/entities/celeb.entity';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { TrendCategory } from '../enums/trend-category.enum';

registerEnumType(TrendCategory, { name: 'TrendCategory' });

@InputType('TrendInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Trend extends CoreEntity {
  @Column({ default: '' })
  @Field(type => String, { defaultValue: '' })
  mainImage?: string;

  @Column({ default: '' })
  @Field(type => String, { defaultValue: '' })
  coverImage?: string;

  @Column()
  @Field(type => String)
  korTitle: string;

  @Column()
  @Field(type => String)
  engTitle: string;

  @Column({ type: 'enum', enum: TrendCategory })
  @Field(type => TrendCategory)
  category: TrendCategory;

  @Column()
  @Field(type => String)
  description: string;

  @Column({ nullable: true })
  @Field(type => String, { nullable: true })
  trailer?: string;

  @OneToMany(type => Celeb, celeb => celeb.trend, {
    nullable: true,
    eager: true,
    onUpdate: 'CASCADE',
  })
  @Field(type => [Celeb], { nullable: true })
  casts?: Celeb[];

  @Column({ nullable: true })
  @Field(type => Date, { nullable: true })
  @IsDate()
  issueDate?: Date;
}
