import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Celeb } from 'src/celebs/entities/celeb.entity';
import { CoreEntity } from 'src/common/entities/core.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, RelationId } from 'typeorm';

@InputType('PaymentInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Payment extends CoreEntity {
  @Column()
  @Field(type => String)
  transactionId: string;

  @Field(type => User)
  @ManyToOne(type => User, user => user.payments)
  user: User;

  @RelationId((payment: Payment) => payment.user)
  userId: number;
}
