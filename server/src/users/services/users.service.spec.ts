import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FollowService } from 'src/follow/follow.service';
import { JwtService } from 'src/jwt/jwt.service';
import { LettersService } from 'src/letters/letters.service';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Verification } from '../entities/verification.entity';
import { UserInfoService } from './userInfo.service';
import { UsersService } from './users.service';

const mockRepository = () => ({
  findOne: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
  findOneOrFail: jest.fn(),
  delete: jest.fn(),
});

const mockJwtService = {
  sign: jest.fn(() => 'signed-token'),
  verify: jest.fn(),
};

const mockUserInfoService = {
  getUserInfo: jest.fn(() => {
    return {
      ok: true,
      error: null,
      userInfo: {
        userId: 1,
      },
    };
  }),
  createUserInfo: jest.fn(() => {
    return {
      ok: true,
      error: null,
      userInfo: {
        userName: 'nearceleb',
        email: 'nearceleb@email.com',
      },
    };
  }),
  deleteUserInfo: jest.fn(),
};

const mockLettersService = {
  deleteAllLetters: jest.fn(),
};

const mockFollowService = {
  deleteAllFollows: jest.fn(),
};

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('Users Service', () => {
  let service: UsersService;
  let usersRepository: MockRepository<User>;
  let verificationRepository: MockRepository<Verification>;
  let jwtService: JwtService;
  let userInfoService: UserInfoService;
  let lettersService: LettersService;
  let followService: FollowService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UserInfoService,
          useValue: mockUserInfoService,
        },
        {
          provide: LettersService,
          useValue: mockLettersService,
        },
        {
          provide: FollowService,
          useValue: mockFollowService,
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository(),
        },
        {
          provide: getRepositoryToken(Verification),
          useValue: mockRepository(),
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();
    service = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
    userInfoService = module.get<UserInfoService>(UserInfoService);
    lettersService = module.get<LettersService>(LettersService);
    followService = module.get<FollowService>(FollowService);
    usersRepository = module.get<MockRepository<User>>(
      getRepositoryToken(User),
    );
    verificationRepository = module.get<MockRepository<Verification>>(
      getRepositoryToken(Verification),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    // given
    const createUserArgs = {
      email: 'nearceleb@email.com',
      userName: 'nearceleb',
    };
    const newUser = {
      userInfo: createUserArgs,
    };
    it('should create user', async () => {
      // when
      usersRepository.create.mockReturnValue(newUser);
      usersRepository.save.mockResolvedValue(newUser);
      const result = await service.createUser(createUserArgs);
      // then
      expect(userInfoService.createUserInfo).toHaveBeenCalledTimes(1);
      expect(userInfoService.createUserInfo).toHaveBeenCalledWith(
        createUserArgs,
      );
      expect(usersRepository.create).toHaveBeenCalledTimes(1);
      expect(usersRepository.create).toHaveBeenCalledWith({
        userInfo: createUserArgs,
      });
      expect(usersRepository.save).toHaveBeenCalledTimes(1);
      expect(usersRepository.save).toHaveBeenCalledWith(newUser);
      expect(result).toEqual({ ok: true });
    });
    it('should fail on error', async () => {
      usersRepository.save.mockRejectedValue(new Error());
      const result = await service.createUser(createUserArgs);
      expect(result).toEqual({
        ok: false,
        error: 'Cannot create user',
      });
    });
  });

  describe('getUserById', () => {
    it('should give error if user not found', async () => {
      usersRepository.findOne.mockResolvedValue(null);
      const result = await service.getUserById({ id: 1 });
      expect(result).toEqual({
        ok: false,
        error: 'User not found',
      });
    });
    it('should find an existing user by given id', async () => {
      usersRepository.findOne.mockResolvedValue({ id: 1 });
      const result = await service.getUserById({ id: 1 });
      const findByIdArgs = {
        id: 1,
      };
      expect(result).toEqual({
        ok: true,
        user: findByIdArgs,
      });
    });
    it('should fail on error', async () => {
      usersRepository.findOne.mockRejectedValue(new Error());
      const result = await service.getUserById({ id: 1 });
      expect(result).toEqual({
        ok: false,
        error: 'Cannot get the user',
      });
    });
  });

  describe('getUserByEmail', () => {
    it('should give error if user not found', async () => {
      usersRepository.findOneOrFail.mockRejectedValue(new Error());
      const result = await service.getUserByEmail({
        email: 'harry@james.potter',
      });
      expect(result).toEqual({
        ok: false,
        error: 'Cannot get user by email',
      });
    });
    it('should get user with email', async () => {
      usersRepository.findOneOrFail.mockResolvedValue({
        userInfo: {
          userName: 'nearceleb',
          email: 'nearceleb@email.com',
        },
      });
      const result = await service.getUserByEmail({
        email: 'nearceleb@email.com',
      });
      expect(userInfoService.getUserInfo).toHaveBeenCalledWith({
        email: 'nearceleb@email.com',
      });
      expect(usersRepository.findOneOrFail).toHaveBeenCalledWith({ id: 1 });
      expect(result).toEqual({
        ok: true,
        user: {
          userInfo: {
            userName: 'nearceleb',
            email: 'nearceleb@email.com',
          },
        },
      });
    });
  });
});
