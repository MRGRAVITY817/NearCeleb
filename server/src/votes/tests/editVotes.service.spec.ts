import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CelebVote } from 'src/celebs/entities/celebVote.entity';
import { EditVote } from '../entities/editVote.entity';
import { EditVoteItem } from '../entities/editVoteItem.entity';
import { VoteStatus } from '../enums/voteStatus.enum';
import { EditVotesService } from '../services/editVotes.service';
import {
  mockCelebVote,
  mockCoreEntity,
  mockRepository,
  MockRepository,
  mockUserVote,
} from './_common';

const mockEditVoteInfo: EditVoteItem = {
  engName: 'Near Celeb',
};

const mockEditVote: EditVote = {
  userVote: mockUserVote,
  userVoteId: mockUserVote.id,
  celebVote: mockCelebVote,
  celebVoteId: mockCelebVote.id,
  info: mockEditVoteInfo,
  agreed: 0,
  status: VoteStatus.Pending,
  isMine: jest.fn(userId => userId === mockUserVote.userId),
  ...mockCoreEntity,
};

describe('Edit Vote Service', () => {
  let service: EditVotesService;
  let editVotesRepository: MockRepository<EditVote>;
  let celebVotesRepository: MockRepository<CelebVote>;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        EditVotesService,
        {
          provide: getRepositoryToken(EditVote),
          useValue: mockRepository(),
        },
        {
          provide: getRepositoryToken(CelebVote),
          useValue: mockRepository(),
        },
      ],
    }).compile();
    service = module.get<EditVotesService>(EditVotesService);
    editVotesRepository = module.get<MockRepository<EditVote>>(
      getRepositoryToken(EditVote),
    );
    celebVotesRepository = module.get<MockRepository<CelebVote>>(
      getRepositoryToken(CelebVote),
    );
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('createEditVote', () => {
    it('should give an error when celeb vote not found', async () => {
      celebVotesRepository.findOne.mockResolvedValue(null);
      const result = await service.createEditVote(mockUserVote, {
        save: false,
        celebId: 1,
        ...mockEditVoteInfo,
      });
      expect(celebVotesRepository.findOne).toBeCalledTimes(1);
      expect(celebVotesRepository.findOne).toBeCalledWith({
        where: { celebId: 1 },
      });
      expect(result).toEqual({
        ok: false,
        error: 'Celeb vote not found',
      });
    });
    it('should create edit-vote as voting mode', async () => {
      celebVotesRepository.findOne.mockResolvedValue(mockCelebVote);
      editVotesRepository.create.mockReturnValue({
        userVote: mockUserVote,
        celebVote: mockCelebVote,
        agreed: 0,
        status: VoteStatus.Voting,
        info: mockEditVoteInfo,
      });
      const result = await service.createEditVote(mockUserVote, {
        save: false,
        celebId: 1,
        ...mockEditVoteInfo,
      });
      expect(celebVotesRepository.findOne).toBeCalledTimes(1);
      expect(celebVotesRepository.findOne).toBeCalledWith({
        where: { celebId: 1 },
      });
      expect(editVotesRepository.create).toBeCalledTimes(1);
      expect(editVotesRepository.create).toBeCalledWith({
        userVote: mockUserVote,
        celebVote: mockCelebVote,
        agreed: 0,
        status: VoteStatus.Voting,
        info: mockEditVoteInfo,
      });
      expect(editVotesRepository.save).toBeCalledTimes(1);
      expect(editVotesRepository.save).toBeCalledWith({
        userVote: mockUserVote,
        celebVote: mockCelebVote,
        agreed: 0,
        status: VoteStatus.Voting,
        info: mockEditVoteInfo,
      });
      expect(result).toEqual({
        ok: true,
      });
    });
    it('should create edit-vote as pending mode', async () => {
      celebVotesRepository.findOne.mockResolvedValue(mockCelebVote);
      editVotesRepository.create.mockReturnValue({
        userVote: mockUserVote,
        celebVote: mockCelebVote,
        agreed: 0,
        status: VoteStatus.Pending,
        info: mockEditVoteInfo,
      });
      const result = await service.createEditVote(mockUserVote, {
        save: true,
        celebId: 1,
        ...mockEditVoteInfo,
      });
      expect(editVotesRepository.create).toBeCalledWith({
        userVote: mockUserVote,
        celebVote: mockCelebVote,
        agreed: 0,
        status: VoteStatus.Pending,
        info: mockEditVoteInfo,
      });
      expect(editVotesRepository.save).toBeCalledTimes(1);
      expect(editVotesRepository.save).toBeCalledWith({
        userVote: mockUserVote,
        celebVote: mockCelebVote,
        agreed: 0,
        status: VoteStatus.Pending,
        info: mockEditVoteInfo,
      });
      expect(result).toEqual({
        ok: true,
      });
    });
    it('should give an error on exception', async () => {
      celebVotesRepository.findOne.mockRejectedValue(new Error());
      const result = await service.createEditVote(mockUserVote, {
        save: false,
        celebId: 1,
        ...mockEditVoteInfo,
      });
      expect(result).toEqual({
        ok: false,
        error: 'Cannot create edit-vote',
      });
    });
  });
  describe('getAllEditVotes', () => {
    it('should get all edit-votes', async () => {
      editVotesRepository.find.mockResolvedValue([]);
      const result = await service.getAllEditVotes();
      expect(editVotesRepository.find).toBeCalledTimes(1);
      expect(editVotesRepository.find).toBeCalledWith();
      expect(result).toEqual({
        ok: true,
        editVotes: [],
      });
    });
    it('should give an error on exception', async () => {
      editVotesRepository.find.mockRejectedValue(new Error());
      const result = await service.getAllEditVotes();
      expect(result).toEqual({
        ok: false,
        error: 'Cannot get edit-votes',
      });
    });
  });
  describe('getEditVotesByUser', () => {
    it('should return paginated edit-votes result', async () => {
      editVotesRepository.findAndCount.mockResolvedValue([
        [mockEditVote, mockEditVote],
        4,
      ]);
      const result = await service.getEditVotesByUser(mockUserVote, {
        page: 1,
        itemsPerPage: 2,
      });
      expect(editVotesRepository.findAndCount).toBeCalledTimes(1);
      expect(editVotesRepository.findAndCount).toBeCalledWith({
        skip: 0,
        take: 2,
        order: { updatedAt: 'DESC' },
        where: {
          userVote: mockUserVote,
        },
      });
      expect(result).toEqual({
        ok: true,
        pages: 2,
        totalResults: 4,
        editVotes: [mockEditVote, mockEditVote],
      });
    });
    it('should give an error on exception', async () => {
      editVotesRepository.findAndCount.mockRejectedValue(new Error());
      const result = await service.getEditVotesByUser(mockUserVote, {
        page: 1,
        itemsPerPage: 2,
      });
      expect(result).toEqual({
        ok: false,
        error: 'Cannot get user edit-votes',
      });
    });
  });
  describe('getEditVotesByCeleb', () => {
    it('should return paginated edit-votes result', async () => {
      editVotesRepository.findAndCount.mockResolvedValue([
        [mockEditVote, mockEditVote],
        2,
      ]);
      const result = await service.getEditVotesByCeleb({
        celebVoteId: 1,
        page: 1,
        itemsPerPage: 2,
      });
      expect(editVotesRepository.findAndCount).toBeCalledTimes(1);
      expect(editVotesRepository.findAndCount).toBeCalledWith({
        skip: 0,
        take: 2,
        order: { updatedAt: 'DESC' },
        where: {
          celebVoteId: 1,
        },
      });
      expect(result).toEqual({
        ok: true,
        pages: 1,
        totalResults: 2,
        editVotes: [mockEditVote, mockEditVote],
      });
    });
    it('should give an error on exception', async () => {
      editVotesRepository.findAndCount.mockRejectedValue(new Error());
      const result = await service.getEditVotesByCeleb({
        celebVoteId: 1,
        page: 1,
        itemsPerPage: 2,
      });
      expect(result).toEqual({
        ok: false,
        error: 'Cannot get user edit-votes',
      });
    });
  });
  describe('cancelEditVote', () => {
    it('should give an error if edit-vote does not belong to user-vote', async () => {
      editVotesRepository.findOneOrFail.mockResolvedValue(mockEditVote);
      const result = await service.cancelEditVote(
        { ...mockUserVote, userId: 2 },
        { id: 1, remove: false },
      );
      expect(editVotesRepository.findOneOrFail).toBeCalledTimes(1);
      expect(editVotesRepository.findOneOrFail).toBeCalledWith(1);
      expect(result).toEqual({
        ok: false,
        error: 'Unauthorized request',
      });
    });
    it('should cancel edit-vote', async () => {
      editVotesRepository.findOneOrFail.mockResolvedValue(mockEditVote);
      const result = await service.cancelEditVote(mockUserVote, {
        id: 1,
        remove: false,
      });
      expect(editVotesRepository.save).toBeCalledTimes(1);
      expect(editVotesRepository.save).toBeCalledWith(
        expect.objectContaining({
          status: VoteStatus.Pending,
        }),
      );
      expect(result).toEqual({
        ok: true,
      });
    });
    it('should cancel and delete edit-vote', async () => {
      editVotesRepository.findOneOrFail.mockResolvedValue({
        ...mockEditVote,
        isMine: jest.fn(() => true),
      });
      const result = await service.cancelEditVote(mockUserVote, {
        id: 1,
        remove: true,
      });
      expect(editVotesRepository.delete).toBeCalledTimes(1);
      expect(editVotesRepository.delete).toBeCalledWith(
        expect.objectContaining({
          id: 1,
        }),
      );
      expect(result).toEqual({
        ok: true,
      });
    });
    it('should give an error on exception', async () => {
      editVotesRepository.findOneOrFail.mockRejectedValue(new Error());
      const result = await service.cancelEditVote(mockUserVote, {
        id: 1,
        remove: true,
      });
      expect(result).toEqual({
        ok: true,
        error: 'Cannot cancel edit-vote',
      });
    });
  });
});
