import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { UserVote } from 'src/users/entities/userVote.entity';
import { Column, Entity, ManyToOne, RelationId } from 'typeorm';
import { AddVoteItem } from './addVoteItem.entity';
import { Vote } from './vote.entity';

@InputType('AddVoteInputType', { isAbstract: true })
@ObjectType()
@Entity()
// export class AddVote extends OmitType(Vote, ['celeb', 'celebId']) {
export class AddVote extends Vote {
  @ManyToOne(type => UserVote, userVote => userVote.addVotes, {
    onDelete: 'SET NULL',
  })
  @Field(type => UserVote)
  userVote: UserVote;

  @RelationId((addVote: AddVote) => addVote.userVote)
  userVoteId: number;

  @Column({ type: 'json', nullable: true })
  @Field(type => AddVoteItem, { nullable: true })
  info?: AddVoteItem;

  isMine(userId: number): boolean {
    return this.userVote.userId === userId;
  }
}
