import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CelebVote } from 'src/celebs/entities/celebVote.entity';
import { UserVote } from 'src/users/entities/userVote.entity';
import { Column, Entity, ManyToOne, RelationId } from 'typeorm';
import { EditVoteItem } from './editVoteItem.entity';
import { Vote } from './vote.entity';

@InputType('EditVoteInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class EditVote extends Vote {
  @ManyToOne(type => UserVote, userVote => userVote.editVotes, {
    onDelete: 'SET NULL',
  })
  @Field(type => UserVote)
  userVote: UserVote;

  @RelationId((editVote: EditVote) => editVote.userVote)
  userVoteId: number;

  @ManyToOne(type => CelebVote, celebVote => celebVote.editVotes, {
    onDelete: 'SET NULL',
  })
  @Field(type => CelebVote)
  celebVote: CelebVote;

  @RelationId((editVote: EditVote) => editVote.celebVote)
  celebVoteId: number;

  @Column({ type: 'json', nullable: true })
  @Field(type => EditVoteItem, { nullable: true })
  info?: EditVoteItem;

  isMine(userId: number): boolean {
    return this.userVote.userId === userId;
  }
}
