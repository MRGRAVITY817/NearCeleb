import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
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
import { Trend } from './entities/trend.entity';
import { TrendsService } from './trends.service';

@Resolver(of => Trend)
export class TrendsResolver {
  constructor(private readonly trendsService: TrendsService) {}

  @Query(returns => GetAllTrendsOutput)
  getAllTrends(): Promise<GetAllTrendsOutput> {
    return this.trendsService.getAllTrends();
  }

  @Query(returns => GetTrendByIdOutput)
  getTrendById(
    @Args('input') getTrendByIdInput: GetTrendByIdInput,
  ): Promise<GetTrendByIdOutput> {
    return this.trendsService.getTrendById(getTrendByIdInput);
  }

  @Query(returns => GetLatestTrendByCategoryOutput)
  getLatestTrendByCategory(
    @Args('input') getLatestTrendByCategoryInput: GetLatestTrendByCategoryInput,
  ): Promise<GetLatestTrendByCategoryOutput> {
    return this.trendsService.getLatestTrendByCategory(
      getLatestTrendByCategoryInput,
    );
  }

  @Mutation(returns => CreateTrendOutput)
  createTrend(
    @Args('input') createTrendInput: CreateTrendInput,
  ): Promise<CreateTrendOutput> {
    return this.trendsService.createTrend(createTrendInput);
  }

  @Mutation(returns => EditTrendOutput)
  editTrend(
    @Args('input') editTrendInput: EditTrendInput,
  ): Promise<EditTrendOutput> {
    return this.trendsService.editTrend(editTrendInput);
  }

  @Mutation(returns => DeleteTrendOutput)
  deleteTrend(
    @Args('input') deleteTrendInput: DeleteTrendInput,
  ): Promise<DeleteTrendOutput> {
    return this.trendsService.deleteTrend(deleteTrendInput);
  }
}
