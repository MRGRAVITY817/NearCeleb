import { CelebVote } from 'src/celebs/entities/celebVote.entity';
import { UserVote } from 'src/users/entities/userVote.entity';
import { Repository } from 'typeorm';

export const mockCoreEntity = {
  id: 1,
  updatedAt: new Date(),
  createdAt: new Date(),
};

export const mockUserVote: UserVote = {
  userId: 1,
  user: {
    verified: true,
    following: [],
    ...mockCoreEntity,
  },
  ...mockCoreEntity,
};

export const mockRepository = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
  findOneOrFail: jest.fn(),
  findAndCount: jest.fn(),
  delete: jest.fn(),
});

export type MockRepository<T = any> = Partial<
  Record<keyof Repository<T>, jest.Mock>
>;

export const mockCelebVote: CelebVote = {
  celebId: 1,
  celeb: {
    followers: [],
    letters: [],
    ...mockCoreEntity,
  },
  ...mockCoreEntity,
};
