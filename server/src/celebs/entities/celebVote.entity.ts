import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { DeleteVote } from 'src/votes/entities/deleteVote.entity';
import { EditVote } from 'src/votes/entities/editVote.entity';
import { Entity, JoinTable, OneToMany, OneToOne, RelationId } from 'typeorm';
import { Celeb } from './celeb.entity';

@InputType('CelebVoteInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class CelebVote extends CoreEntity {
  @OneToOne(type => Celeb, celeb => celeb.celebVote)
  @Field(type => Celeb)
  celeb: Celeb;

  @RelationId((celebVote: CelebVote) => celebVote.celeb)
  celebId: number;

  @OneToMany(type => EditVote, editVote => editVote.celebVote, {
    nullable: true,
  })
  @Field(type => [EditVote], { nullable: true })
  @JoinTable()
  editVotes?: EditVote[];

  @OneToMany(type => DeleteVote, deleteVote => deleteVote.celebVote, {
    nullable: true,
  })
  @Field(type => [DeleteVote], { nullable: true })
  @JoinTable()
  deleteVotes?: DeleteVote[];
}
