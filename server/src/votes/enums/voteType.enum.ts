import { registerEnumType } from '@nestjs/graphql';

export enum VoteType {
  Add = 'Add',
  Edit = 'Edit',
  Delete = 'Delete',
}

registerEnumType(VoteType, { name: 'VoteType' });
