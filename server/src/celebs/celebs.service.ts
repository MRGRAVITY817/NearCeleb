import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { deleteFile } from 'src/common/lib/files';
import { Raw, Repository } from 'typeorm';
import {
  CreateCelebInput,
  CreateCelebOutput,
  EditCelebInput,
  EditCelebOutput,
  GetAllCelebsOutput,
  GetAllCelebsPaginatedInput,
  GetAllCelebsPaginatedOutput,
  GetCelebByIdInput,
  GetCelebByIdOutput,
  GetCelebsByRoleInput,
  GetCelebsByRoleOutput,
  SearchCelebByNameInput,
  SearchCelebByNameOutput,
  DeleteCelebInput,
  DeleteCelebOutput,
  GetCelebsByMonthInput,
  SearchCelebsInput,
  SearchCelebsOutput,
  SearchCelebsByMonthInput,
  SearchCelebsByMonthOutput,
  GetCelebObjectByIdInput,
  GetCelebObjectByIdOutput,
  CreateTempCelebOutput,
  CheckIfCelebExistsInput,
  CheckIfCelebExistsOutput,
} from './dtos';
import { Celeb } from './entities/celeb.entity';
import { CelebInfo } from './entities/celebInfo.entity';
import { Roles } from './entities/roles.entity';
import { Social } from './entities/social.entity';

@Injectable()
export class CelebsService {
  constructor(
    @InjectRepository(Celeb)
    private readonly celebs: Repository<Celeb>,
    @InjectRepository(Social)
    private readonly social: Repository<Social>,
    @InjectRepository(Roles)
    private readonly roles: Repository<Roles>,
    @InjectRepository(CelebInfo)
    private readonly celebInfo: Repository<CelebInfo>,
  ) {}

  async createTempCeleb(): Promise<CreateTempCelebOutput> {
    try {
      const celeb = await this.celebs.save(this.celebs.create());
      return {
        ok: true,
        celeb,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Cannot create temporary celeb',
      };
    }
  }

  async checkIfCelebExists({
    korName,
    engName,
    birthDate,
  }: CheckIfCelebExistsInput): Promise<CheckIfCelebExistsOutput> {
    try {
      const givenCelebInfoExists = await this.celebInfo.findOne({
        where: {
          korName,
          engName,
          birthDate,
        },
      });
      if (givenCelebInfoExists) {
        return {
          ok: true,
        };
      }
      return {
        ok: false,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Cannot check whether celeb exists',
      };
    }
  }

  async createCeleb(
    createCelebInput: CreateCelebInput,
  ): Promise<CreateCelebOutput> {
    try {
      const { ok, error } = await this.checkIfCelebExists({
        korName: createCelebInput.korName,
        engName: createCelebInput.engName,
        birthDate: createCelebInput.birthDate,
      });
      if (ok) {
        await deleteFile({
          bucket: process.env.CELEB_PAGE_BUCKET,
          fileUrl: createCelebInput.profileImage,
        });
        return {
          ok: false,
          error: 'There is already existing celeb.',
        };
      }
      if (error) return { ok, error };

      const social = this.social.create({ ...createCelebInput.social });
      const roles = this.roles.create({ ...createCelebInput.roles });

      const celebInfo = await this.celebInfo.save(
        this.celebInfo.create({
          ...createCelebInput,
          social,
          roles,
        }),
      );
      await this.celebs.save(
        this.celebs.create({
          celebInfo,
        }),
      );
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Could not create Celeb Info.',
      };
    }
  }

  async getCelebObjectById({
    id,
  }: GetCelebObjectByIdInput): Promise<GetCelebObjectByIdOutput> {
    try {
      const celeb = await this.celebs.findOne(id);
      return {
        ok: true,
        celeb,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Cannot find celeb',
      };
    }
  }

  async getAllCelebs(): Promise<GetAllCelebsOutput> {
    try {
      const celebInfo = await this.celebInfo.find();
      return {
        ok: true,
        celebInfo,
      };
    } catch {
      return {
        ok: false,
        error: 'Cannot get all the celeb info',
      };
    }
  }

  async getAllCelebPaginated({
    page,
    itemsPerPage,
  }: GetAllCelebsPaginatedInput): Promise<GetAllCelebsPaginatedOutput> {
    try {
      const [celebInfo, totalResults] = await this.celebInfo.findAndCount({
        skip: (page - 1) * itemsPerPage,
        take: itemsPerPage,
        order: {
          updatedAt: 'DESC',
        },
      });
      return {
        ok: true,
        celebInfo,
        totalPages: Math.ceil(totalResults / itemsPerPage),
        totalResults,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Cannot load celebs',
      };
    }
  }

  async getCelebById({
    celebId,
  }: GetCelebByIdInput): Promise<GetCelebByIdOutput> {
    try {
      const celebInfo = await this.celebInfo.findOne({
        where: { id: celebId },
        relations: ['roles', 'social'],
      });
      return {
        ok: true,
        celebInfo,
      };
    } catch (error) {
      return {
        ok: false,
        // error: 'Cannot get celeb by id',
        error,
      };
    }
  }

  async getCelebsByMonth({
    month,
  }: GetCelebsByMonthInput): Promise<GetAllCelebsOutput> {
    try {
      const celebInfo = await this.celebInfo.find({
        where: {
          birthDate: Raw(date => `DATE_PART('month', ${date}) = ${month}`),
        },
      });
      return {
        ok: true,
        celebInfo,
      };
    } catch {
      return {
        ok: false,
        error: 'Cannot get celebs',
      };
    }
  }

  async getCelebsByRole(
    getCelebsByRoleInput: GetCelebsByRoleInput,
  ): Promise<GetCelebsByRoleOutput> {
    try {
      const query = {};
      for (const [key, value] of Object.entries(getCelebsByRoleInput)) {
        if (value) {
          query[key] = value;
        }
      }
      const roles = await this.roles.find({
        where: query,
        relations: ['celebInfo', 'celebInfo.roles', 'celebInfo.social'],
      });
      return {
        ok: true,
        celebInfo: roles.map(role => role.celebInfo),
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Cannot get celebs',
      };
    }
  }

  async searchCelebByName({
    query,
  }: SearchCelebByNameInput): Promise<SearchCelebByNameOutput> {
    try {
      const celebInfo = await this.celebInfo.find({
        where: [
          { engName: Raw(name => `${name} ILIKE '%${query}%'`) },
          { korName: Raw(name => `${name} ILIKE '%${query}%'`) },
        ],
      });
      return {
        ok: true,
        celebInfo,
      };
    } catch {
      return {
        ok: false,
        error: 'Cannot search celeb with given input',
      };
    }
  }

  async searchCelebs({
    query,
    page,
    ...searchCelebsInput
  }: SearchCelebsInput): Promise<SearchCelebsOutput> {
    try {
      // First get celeb by role
      const { ok, error, celebInfo: RoleCelebs } = await this.getCelebsByRole(
        searchCelebsInput,
      );
      if (error) {
        return {
          ok: false,
          error,
        };
      }
      const startIdx = page * 8;
      const lastIdx = startIdx + 8;
      const allCelebInfo = RoleCelebs.filter(tc =>
        tc.engName.toLowerCase().includes(query.toLowerCase()),
      );
      const pages = Math.ceil(allCelebInfo.length / 8);
      const celebInfo = allCelebInfo.slice(startIdx, lastIdx);
      return {
        ok: true,
        pages,
        celebInfo,
      };
    } catch {
      return {
        ok: false,
        error: 'Cannot search celeb with given input',
      };
    }
  }

  async searchCelebsByMonth({
    month,
    query,
    page,
    ...searchCelebsByMonthInput
  }: SearchCelebsByMonthInput): Promise<SearchCelebsByMonthOutput> {
    try {
      // First get celeb by role
      const { ok, error, celebInfo: RoleCelebs } = await this.getCelebsByRole(
        searchCelebsByMonthInput,
      );
      if (error) {
        return {
          ok: false,
          error,
        };
      }
      const startIdx = page * 8;
      const lastIdx = startIdx + 8;
      const allCelebInfo = RoleCelebs.filter(celeb =>
        celeb.engName.toLowerCase().includes(query.toLowerCase()),
      ).filter(celeb => {
        const celebBirth = new Date(celeb.birthDate);
        return celebBirth.getMonth() === month;
      });
      const pages = Math.ceil(allCelebInfo.length / 8);
      const celebInfo = allCelebInfo.slice(startIdx, lastIdx);
      return {
        ok: true,
        pages,
        celebInfo,
      };
    } catch {
      return {
        ok: false,
        error: 'Cannot search celeb with given input',
      };
    }
  }

  async editCeleb(editCelebInput: EditCelebInput): Promise<EditCelebOutput> {
    try {
      const celeb = await this.celebs.findOne({
        where: { id: editCelebInput.id },
      });
      if (!celeb) {
        return {
          ok: false,
          error: 'Celeb Not Found',
        };
      }
      // Delete old image
      const bucket = process.env.CELEB_PAGE_BUCKET;
      const fileUrl = celeb.celebInfo.profileImage;
      const { ok, error } = await deleteFile({ bucket, fileUrl });
      if (!ok || error) {
        return {
          ok: false,
          error,
        };
      }
      await this.celebInfo.save({
        ...editCelebInput,
      });
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Cannot edit celeb info',
      };
    }
  }

  async deleteCeleb({ id }: DeleteCelebInput): Promise<DeleteCelebOutput> {
    try {
      const celeb = await this.celebs.findOne({
        where: { id },
      });
      if (!celeb) {
        return {
          ok: false,
          error: 'Celeb Not Found',
        };
      }
      const bucket = process.env.CELEB_PAGE_BUCKET;
      const fileUrl = celeb.celebInfo.profileImage;
      const { ok, error } = await deleteFile({ bucket, fileUrl });
      if (!ok || error) {
        return {
          ok: false,
          error,
        };
      }
      await this.celebs.delete(id);
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Cannot delete celeb',
      };
    }
  }
}
