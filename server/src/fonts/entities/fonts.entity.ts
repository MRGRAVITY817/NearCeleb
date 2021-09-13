import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@InputType('FontInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Font extends CoreEntity {
  @Field(type => [User])
  @ManyToOne(type => User, user => user.createdFonts, { onDelete: 'CASCADE' })
  creator: User;

  @Column({ unique: true })
  @Field(type => String)
  name: string;

  @Column()
  @Field(type => String, { nullable: true })
  description?: string;
}
