import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CelebVote } from 'src/celebs/entities/celebVote.entity';
import { UserVote } from 'src/users/entities/userVote.entity';
import { Column, Entity, ManyToOne, RelationId } from 'typeorm';
import { Vote } from './vote.entity';

@InputType('DeleteVoteInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class DeleteVote extends Vote {
  @ManyToOne(type => UserVote, userVote => userVote.deleteVotes, {
    onDelete: 'SET NULL',
  })
  @Field(type => UserVote)
  userVote: UserVote;

  @RelationId((deleteVote: DeleteVote) => deleteVote.userVote)
  userVoteId: number;

  @ManyToOne(type => CelebVote, celebVote => celebVote.deleteVotes, {
    onDelete: 'SET NULL',
  })
  @Field(type => CelebVote)
  celebVote: CelebVote;

  @RelationId((deleteVote: DeleteVote) => deleteVote.celebVote)
  celebVoteId: number;

  @Column()
  @Field(type => String)
  reason: string;

  isMine(userId: number): boolean {
    return this.userVote.userId === userId;
  }
}
