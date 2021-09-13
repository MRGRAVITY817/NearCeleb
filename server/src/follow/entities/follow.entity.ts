import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Celeb } from 'src/celebs/entities/celeb.entity';
import { CoreEntity } from 'src/common/entities/core.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, ManyToOne, RelationId } from 'typeorm';

@InputType('FollowInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Follow extends CoreEntity {
  @ManyToOne(type => User, user => user.following, {
    onDelete: 'SET NULL',
    nullable: true,
    eager: true,
  })
  @Field(type => User)
  user: User;

  @ManyToOne(type => Celeb, celeb => celeb.followers, {
    onDelete: 'SET NULL',
    nullable: true,
    eager: true,
  })
  @Field(type => Celeb)
  celeb: Celeb;

  @RelationId((follow: Follow) => follow.user)
  userId: number;

  @RelationId((follow: Follow) => follow.celeb)
  celebId: number;
}
