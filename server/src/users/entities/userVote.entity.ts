import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { AddVote } from 'src/votes/entities/addVote.entity';
import { DeleteVote } from 'src/votes/entities/deleteVote.entity';
import { EditVote } from 'src/votes/entities/editVote.entity';
import { Entity, JoinTable, OneToMany, OneToOne, RelationId } from 'typeorm';
import { User } from './user.entity';

@InputType('UserVoteInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class UserVote extends CoreEntity {
  @OneToOne(type => User, user => user.userVote)
  @Field(type => User)
  user: User;

  @RelationId((userVote: UserVote) => userVote.user)
  userId: number;

  @OneToMany(type => AddVote, addVote => addVote.userVote, {
    nullable: true,
  })
  @Field(type => [AddVote], { nullable: true })
  @JoinTable()
  addVotes?: AddVote[];

  @OneToMany(type => EditVote, editVote => editVote.userVote, {
    nullable: true,
  })
  @Field(type => [EditVote], { nullable: true })
  @JoinTable()
  editVotes?: EditVote[];

  @OneToMany(type => DeleteVote, deleteVote => deleteVote.userVote, {
    nullable: true,
  })
  @Field(type => [DeleteVote], { nullable: true })
  @JoinTable()
  deleteVotes?: DeleteVote[];
}
