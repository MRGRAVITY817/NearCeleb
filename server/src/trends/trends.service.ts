import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Celeb } from 'src/celebs/entities/celeb.entity';
import {
  CreateTrendInput,
  CreateTrendOutput,
  DeleteTrendInput,
  DeleteTrendOutput,
  EditTrendInput,
  EditTrendOutput,
  GetAllTrendsOutput,
  GetLatestTrendByCategoryInput,
  GetLatestTrendByCategoryOutput,
  GetTrendByIdInput,
  GetTrendByIdOutput,
} from 'src/trends/dtos';
import { Repository } from 'typeorm';
import { Trend } from './entities/trend.entity';

@Injectable()
export class TrendsService {
  constructor(
    @InjectRepository(Trend)
    private readonly trends: Repository<Trend>,
    @InjectRepository(Celeb)
    private readonly celebs: Repository<Celeb>,
  ) {}

  async getAllTrends(): Promise<GetAllTrendsOutput> {
    try {
      const trends = await this.trends.find();
      return {
        ok: true,
        trends,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Cannot get the trends',
      };
    }
  }

  async getTrendById({ id }: GetTrendByIdInput): Promise<GetTrendByIdOutput> {
    try {
      const trend = await this.trends.findOne({ where: { id } });
      return {
        ok: true,
        trend,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Cannot find trend',
      };
    }
  }

  async getLatestTrendByCategory({
    category,
  }: GetLatestTrendByCategoryInput): Promise<GetLatestTrendByCategoryOutput> {
    try {
      const trend = await this.trends.findOne({
        where: { category },
        order: { updatedAt: 'DESC' },
      });
      return {
        ok: true,
        trend,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Cannot find trend',
      };
    }
  }

  async createTrend({
    mainImage,
    coverImage,
    korTitle,
    engTitle,
    category,
    description,
    issueDate,
    trailer,
    castIds,
  }: CreateTrendInput): Promise<CreateTrendOutput> {
    try {
      const trend = await this.trends.findOne({
        where: { korTitle, engTitle },
      });
      if (trend) {
        return {
          ok: false,
          error: 'Trend already exists',
        };
      }
      const casts: Celeb[] = [];
      castIds.map(async id => {
        const celeb = await this.celebs.findOne(id);
        casts.push(celeb);
      });
      const newTrend = await this.trends.save(
        this.trends.create({
          mainImage,
          coverImage,
          korTitle,
          engTitle,
          category,
          description,
          issueDate,
          trailer,
        }),
      );
      casts.map(async cast => {
        cast.trend = newTrend;
        await this.celebs.save(cast);
      });
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Cannot create trend',
      };
    }
  }

  async editTrend({
    id,
    ...trendInfo
  }: EditTrendInput): Promise<EditTrendOutput> {
    try {
      const trend = await this.trends.findOne({ where: { id } });
      if (!trend) {
        return {
          ok: false,
          error: 'Trend not found',
        };
      }
      if (trendInfo.castIds) {
        // First delete old celebs
        trend.casts.map(async cast => {
          cast.trend = null;
          await this.celebs.save(cast);
        });
        trend.casts = [];
        // Append new celebs
        trendInfo.castIds.map(async id => {
          const celeb = await this.celebs.findOne(id);
          trend.casts.push(celeb);
        });
      }
      if (trendInfo.category) trend.category = trendInfo.category;
      if (trendInfo.coverImage) trend.coverImage = trendInfo.coverImage;
      if (trendInfo.description) trend.description = trendInfo.description;
      if (trendInfo.engTitle) trend.engTitle = trendInfo.engTitle;
      if (trendInfo.korTitle) trend.korTitle = trendInfo.korTitle;
      if (trendInfo.mainImage) trend.mainImage = trendInfo.mainImage;
      if (trendInfo.trailer) trend.trailer = trendInfo.trailer;

      const updatedTrend = await this.trends.save(trend);

      trend.casts.map(async cast => {
        cast.trend = updatedTrend;
        await this.celebs.save(cast);
      });
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Cannot edit trend',
      };
    }
  }
  async deleteTrend({ id }: DeleteTrendInput): Promise<DeleteTrendOutput> {
    try {
      const trend = await this.trends.findOne({ where: { id } });
      if (!trend) {
        return {
          ok: false,
          error: 'Trend not found',
        };
      }
      await this.trends.delete(id);
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Cannot delete trend',
      };
    }
  }
}
