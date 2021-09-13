import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Celeb } from 'src/celebs/entities/celeb.entity';
import { Trend } from './entities/trend.entity';
import { TrendsResolver } from './trends.resolver';
import { TrendsService } from './trends.service';

@Module({
  imports: [TypeOrmModule.forFeature([Trend, Celeb])],
  providers: [TrendsService, TrendsResolver],
})
export class TrendsModule {}
