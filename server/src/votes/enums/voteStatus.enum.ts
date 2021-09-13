import { registerEnumType } from '@nestjs/graphql';

export enum VoteStatus {
  Pending = 'Pending',
  Voting = 'Voting',
  Confirmed = 'Confirmed',
  Closed = 'Closed',
}

registerEnumType(VoteStatus, { name: 'VoteStatus' });
