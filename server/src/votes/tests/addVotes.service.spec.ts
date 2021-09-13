import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Gender } from 'src/celebs/enums/gender.enum';
import { Nationality } from 'src/celebs/enums/Nationality.enum';
import { AddVote } from '../entities/addVote.entity';
import { AddVoteItem } from '../entities/addVoteItem.entity';
import { VoteStatus } from '../enums/voteStatus.enum';
import { AddVotesService } from '../services/addVotes.service';
import {
  mockCoreEntity,
  mockRepository,
  MockRepository,
  mockUserVote,
} from './_common';

const mockAddVoteInfo: AddVoteItem = {
  korName: '니어셀럽',
  engName: 'Near Celeb',
  gender: Gender.Male,
  profileImage: 'image',
  nationality: Nationality.Korea,
  roles: {
    actor: true,
    artist: false,
    author: false,
    comedian: false,
    showhost: false,
    influencer: false,
    sports: false,
    ...mockCoreEntity,
  },
};

const mockAddVote: AddVote = {
  userVote: mockUserVote,
  userVoteId: mockUserVote.id,
  isMine: jest.fn(userId => userId === mockUserVote.userId),
  status: VoteStatus.Voting,
  agreed: 0,
  info: mockAddVoteInfo,
  ...mockCoreEntity,
};

describe('Add Vote Service', () => {
  let service: AddVotesService;
  let addVotesRepository: MockRepository<AddVote>;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AddVotesService,
        {
          provide: getRepositoryToken(AddVote),
          useValue: mockRepository(),
        },
      ],
    }).compile();
    service = module.get<AddVotesService>(AddVotesService);
    addVotesRepository = module.get<MockRepository<AddVote>>(
      getRepositoryToken(AddVote),
    );
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('createAddVote', () => {
    it('should create add-vote and save as voting', async () => {
      addVotesRepository.create.mockReturnValue(mockAddVoteInfo);
      const result = await service.createAddVote(mockUserVote, {
        ...mockAddVoteInfo,
        save: false,
      });
      expect(addVotesRepository.create).toBeCalledTimes(1);
      expect(addVotesRepository.create).toBeCalledWith({
        userVote: mockUserVote,
        agreed: 0,
        status: VoteStatus.Voting,
        info: mockAddVoteInfo,
      });
      expect(addVotesRepository.save).toBeCalledTimes(1);
      expect(addVotesRepository.save).toBeCalledWith(mockAddVoteInfo);
      expect(result).toEqual({
        ok: true,
      });
    });
    it('should create add-vote and save as pending', async () => {
      addVotesRepository.create.mockReturnValue(mockAddVote);
      addVotesRepository.save.mockResolvedValue(mockAddVote);
      const result = await service.createAddVote(mockUserVote, {
        ...mockAddVoteInfo,
        save: true,
      });
      expect(addVotesRepository.create).toBeCalledWith({
        userVote: mockUserVote,
        agreed: 0,
        status: VoteStatus.Pending,
        info: mockAddVoteInfo,
      });
      expect(result).toEqual({
        ok: true,
      });
    });
    it('should fail on exception', async () => {
      addVotesRepository.save.mockRejectedValue(new Error());
      const result = await service.createAddVote(mockUserVote, {
        ...mockAddVoteInfo,
        save: false,
      });
      expect(result).toEqual({
        ok: false,
        error: 'Cannot create add-vote',
      });
    });
  });
  describe('getAddVoteById', () => {
    it('should give error when add-vote not found or exception', async () => {
      addVotesRepository.findOneOrFail.mockRejectedValue(new Error());
      const result = await service.getAddVoteById({ id: 1 });
      expect(result).toEqual({
        ok: false,
        error: 'Cannot get add-vote by id',
      });
    });
    it('should return add-vote by id', async () => {
      addVotesRepository.findOneOrFail.mockResolvedValue(mockAddVote);
      const result = await service.getAddVoteById({ id: 1 });
      expect(addVotesRepository.findOneOrFail).toBeCalled();
      expect(addVotesRepository.findOneOrFail).toBeCalledWith(1);
      expect(result).toEqual({
        ok: true,
        addVote: mockAddVote,
      });
    });
  });
  describe('getAllAddVotes', () => {
    it('should return paginated add-votes', async () => {
      addVotesRepository.findAndCount.mockResolvedValue([
        [mockAddVote, mockAddVote],
        4,
      ]);
      const result = await service.getAllAddVotes({ itemsPerPage: 2, page: 1 });
      expect(addVotesRepository.findAndCount).toBeCalledTimes(1);
      expect(addVotesRepository.findAndCount).toBeCalledWith({
        skip: 0,
        take: 2,
        order: {
          updatedAt: 'DESC',
        },
      });
      expect(result).toEqual({
        ok: true,
        addVotes: [mockAddVote, mockAddVote],
        pages: 2,
        totalResults: 4,
      });
    });
    it('should give an error when exception occurs', async () => {
      addVotesRepository.findAndCount.mockRejectedValue(new Error());
      const result = await service.getAllAddVotes({ itemsPerPage: 2, page: 1 });
      expect(result).toEqual({
        ok: false,
        error: 'Cannot get all add-votes',
      });
    });
  });
  describe('getAddVotesByUser', () => {
    it(`should return user's add-votes`, async () => {
      addVotesRepository.findAndCount.mockResolvedValue([
        [mockAddVote, mockAddVote],
        4,
      ]);
      const result = await service.getAddVotesByUser(mockUserVote, {
        page: 1,
        itemsPerPage: 2,
      });
      expect(addVotesRepository.findAndCount).toBeCalledTimes(1);
      expect(addVotesRepository.findAndCount).toBeCalledWith({
        skip: 0,
        take: 2,
        order: {
          updatedAt: 'DESC',
        },
        where: {
          userVote: mockUserVote,
        },
      });
      expect(result).toEqual({
        ok: true,
        addVotes: [mockAddVote, mockAddVote],
        pages: 2,
        totalResults: 4,
      });
    });
    it('should give error when exception occurs', async () => {
      addVotesRepository.findAndCount.mockRejectedValue(new Error());
      const result = await service.getAddVotesByUser(mockUserVote, {
        page: 1,
        itemsPerPage: 2,
      });
      expect(result).toEqual({
        ok: false,
        error: 'Cannot get user add-votes',
      });
    });
  });
  describe('confirmAddVote', () => {
    it('should confirm add-vote', async () => {
      addVotesRepository.findOneOrFail.mockResolvedValue(mockAddVoteInfo);
      const result = await service.confirmAddVote({ id: 1 });
      expect(addVotesRepository.findOneOrFail).toBeCalledTimes(1);
      expect(addVotesRepository.findOneOrFail).toBeCalledWith(1);
      expect(result).toEqual({
        ok: true,
      });
    });
    it('should give error when exception occurs', async () => {
      addVotesRepository.findOneOrFail.mockRejectedValue(new Error());
      const result = await service.confirmAddVote({ id: 1 });
      expect(result).toEqual({
        ok: false,
        error: 'Cannot confirm add-vote',
      });
    });
  });
  describe('cancelAddVote', () => {
    it('should give an error if unauthorized', async () => {
      addVotesRepository.findOneOrFail.mockResolvedValue(mockAddVote);
      const result = await service.cancelAddVote(
        { ...mockUserVote, userId: 2 },
        {
          id: 1,
          remove: false,
        },
      );
      expect(addVotesRepository.findOneOrFail).toBeCalledTimes(1);
      expect(addVotesRepository.findOneOrFail).toBeCalledWith(1);
      expect(result).toEqual({
        ok: false,
        error: 'Not your add-vote',
      });
    });
    it('should cancel add-vote', async () => {
      addVotesRepository.findOneOrFail.mockResolvedValue(mockAddVote);
      const result = await service.cancelAddVote(mockUserVote, {
        id: 1,
        remove: false,
      });
      expect(addVotesRepository.findOneOrFail).toBeCalledTimes(1);
      expect(addVotesRepository.findOneOrFail).toBeCalledWith(1);
      expect(addVotesRepository.save).toBeCalledTimes(1);
      expect(addVotesRepository.save).toBeCalledWith(
        expect.objectContaining({ status: VoteStatus.Pending }),
      );
      expect(result).toEqual({
        ok: true,
      });
    });
    it('should cancel and remove add-vote', async () => {
      addVotesRepository.findOneOrFail.mockResolvedValue(mockAddVote);
      addVotesRepository.delete.mockResolvedValue('Deleted');
      const result = await service.cancelAddVote(mockUserVote, {
        id: 1,
        remove: true,
      });
      expect(addVotesRepository.findOneOrFail).toBeCalledTimes(1);
      expect(addVotesRepository.findOneOrFail).toBeCalledWith(1);
      expect(addVotesRepository.delete).toBeCalledTimes(1);
      expect(addVotesRepository.delete).toBeCalledWith(mockAddVote);
      expect(result).toEqual({
        ok: true,
      });
    });
    it('should give an error when exception occurs', async () => {
      addVotesRepository.findOneOrFail.mockRejectedValue(new Error());
      const result = await service.cancelAddVote(mockUserVote, {
        id: 1,
        remove: true,
      });
      expect(result).toEqual({
        ok: false,
        error: 'Cannot cancel add-vote',
      });
    });
  });
  describe('resubmitAddVote', () => {
    it('should give an error when unauthorized', async () => {
      addVotesRepository.findOneOrFail.mockResolvedValue(mockAddVote);
      const result = await service.resubmitAddVote(
        { ...mockUserVote, userId: 2 },
        { id: 1 },
      );
      expect(addVotesRepository.findOneOrFail).toBeCalledTimes(1);
      expect(addVotesRepository.findOneOrFail).toBeCalledWith(1);
      expect(result).toEqual({
        ok: false,
        error: 'Not your add-vote',
      });
    });
    it('should resubmit add-vote', async () => {
      addVotesRepository.findOneOrFail.mockResolvedValue(mockAddVote);
      const result = await service.resubmitAddVote(mockUserVote, { id: 1 });
      expect(addVotesRepository.findOneOrFail).toBeCalledTimes(1);
      expect(addVotesRepository.findOneOrFail).toBeCalledWith(1);
      expect(addVotesRepository.save).toBeCalledTimes(1);
      expect(addVotesRepository.save).toBeCalledWith(
        expect.objectContaining({
          status: VoteStatus.Voting,
        }),
      );
      expect(result).toEqual({
        ok: true,
      });
    });
    it('should return error when exception occurs', async () => {
      addVotesRepository.findOneOrFail.mockRejectedValue(new Error());
      const result = await service.resubmitAddVote(mockUserVote, { id: 1 });
      expect(result).toEqual({
        ok: false,
        error: 'Cannot resubmit add-vote',
      });
    });
  });
  describe('removeAddVote', () => {
    it('should give an error when unauthorized', async () => {
      addVotesRepository.findOneOrFail.mockResolvedValue(mockAddVote);
      const result = await service.removeAddVote(
        { ...mockUserVote, userId: 2 },
        { id: 1 },
      );
      expect(addVotesRepository.findOneOrFail).toBeCalledTimes(1);
      expect(addVotesRepository.findOneOrFail).toBeCalledWith(1);
      expect(result).toEqual({
        ok: false,
        error: 'Not your add-vote',
      });
    });
    it('should remove add-vote', async () => {
      addVotesRepository.findOneOrFail.mockResolvedValue(mockAddVote);
      const result = await service.removeAddVote(mockUserVote, { id: 1 });
      expect(addVotesRepository.findOneOrFail).toBeCalledTimes(1);
      expect(addVotesRepository.findOneOrFail).toBeCalledWith(1);
      expect(addVotesRepository.delete).toBeCalledTimes(1);
      expect(addVotesRepository.delete).toBeCalledWith(
        expect.objectContaining({
          id: 1,
        }),
      );
      expect(result).toEqual({
        ok: true,
      });
    });
    it('should return error when exception occurs', async () => {
      addVotesRepository.delete.mockRejectedValue(new Error());
      const result = await service.removeAddVote(mockUserVote, { id: 1 });
      expect(result).toEqual({
        ok: false,
        error: 'Cannot remove add-vote',
      });
    });
  });
  describe('closeAddVote', () => {
    it('should give an error when add-vote not found', async () => {
      addVotesRepository.findOne.mockResolvedValue(null);
      const result = await service.closeAddVote({ id: 1 });
      expect(addVotesRepository.findOne).toBeCalledTimes(1);
      expect(addVotesRepository.findOne).toBeCalledWith(1);
      expect(result).toEqual({
        ok: false,
        error: 'Add-vote not found',
      });
    });
    it('should close an add-vote', async () => {
      addVotesRepository.findOne.mockResolvedValue(mockAddVoteInfo);
      const result = await service.closeAddVote({ id: 1 });
      expect(addVotesRepository.findOne).toBeCalledTimes(1);
      expect(addVotesRepository.findOne).toBeCalledWith(1);
      expect(addVotesRepository.save).toBeCalledTimes(1);
      expect(addVotesRepository.save).toBeCalledWith(
        expect.objectContaining({
          status: VoteStatus.Closed,
        }),
      );
      expect(result).toEqual({
        ok: true,
      });
    });
    it('should return an error on exception', async () => {
      addVotesRepository.findOne.mockRejectedValue(new Error());
      const result = await service.closeAddVote({ id: 1 });
      expect(result).toEqual({
        ok: false,
        error: 'Cannot close add-vote',
      });
    });
  });
});
