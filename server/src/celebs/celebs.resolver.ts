import { Args, Query, Mutation, Resolver } from '@nestjs/graphql';
import { CelebsService } from './celebs.service';
import {
  CheckIfCelebExistsInput,
  CheckIfCelebExistsOutput,
  CreateCelebInput,
  CreateCelebOutput,
  DeleteCelebInput,
  DeleteCelebOutput,
  EditCelebInput,
  EditCelebOutput,
  GetAllCelebsOutput,
  GetAllCelebsPaginatedInput,
  GetAllCelebsPaginatedOutput,
  GetCelebByIdInput,
  GetCelebByIdOutput,
  GetCelebObjectByIdInput,
  GetCelebObjectByIdOutput,
  GetCelebsByMonthInput,
  GetCelebsByMonthOutput,
  GetCelebsByRoleInput,
  GetCelebsByRoleOutput,
  SearchCelebByNameInput,
  SearchCelebByNameOutput,
  SearchCelebsByMonthInput,
  SearchCelebsByMonthOutput,
  SearchCelebsInput,
  SearchCelebsOutput,
} from './dtos';
import { Celeb } from './entities/celeb.entity';

@Resolver(of => Celeb)
export class CelebsResolver {
  constructor(private readonly celebsService: CelebsService) {}

  @Mutation(returns => CreateCelebOutput)
  createCeleb(
    @Args('input') createCelebInput: CreateCelebInput,
  ): Promise<CreateCelebOutput> {
    return this.celebsService.createCeleb(createCelebInput);
  }

  @Query(returns => CheckIfCelebExistsOutput)
  checkIfCelebExists(
    @Args('input') checkIfCelebExistsInput: CheckIfCelebExistsInput,
  ): Promise<CheckIfCelebExistsOutput> {
    return this.celebsService.checkIfCelebExists(checkIfCelebExistsInput);
  }

  @Query(returns => GetAllCelebsOutput)
  getAllCelebs(): Promise<GetAllCelebsOutput> {
    return this.celebsService.getAllCelebs();
  }

  @Query(returns => GetAllCelebsPaginatedOutput)
  getAllCelebsPaginated(
    @Args('input') getAllCelebsPaginatedInput: GetAllCelebsPaginatedInput,
  ): Promise<GetAllCelebsPaginatedOutput> {
    return this.celebsService.getAllCelebPaginated(getAllCelebsPaginatedInput);
  }

  @Query(returns => GetCelebObjectByIdOutput)
  getCelebObjectById(
    @Args('input') getCelebObjectByIdInput: GetCelebObjectByIdInput,
  ): Promise<GetCelebObjectByIdOutput> {
    return this.celebsService.getCelebObjectById(getCelebObjectByIdInput);
  }

  @Query(returns => GetCelebByIdOutput)
  getCelebById(
    @Args('input') getCelebByIdInput: GetCelebByIdInput,
  ): Promise<GetCelebByIdOutput> {
    return this.celebsService.getCelebById(getCelebByIdInput);
  }

  @Query(returns => GetCelebsByMonthOutput)
  getCelebsByMonth(
    @Args('input') getCelebsByMonthInput: GetCelebsByMonthInput,
  ): Promise<GetCelebsByMonthOutput> {
    return this.celebsService.getCelebsByMonth(getCelebsByMonthInput);
  }

  @Query(returns => GetCelebsByRoleOutput)
  getCelebsByRole(
    @Args('input') getCelebsByRoleInput: GetCelebsByRoleInput,
  ): Promise<GetCelebsByRoleOutput> {
    return this.celebsService.getCelebsByRole(getCelebsByRoleInput);
  }

  @Query(returns => SearchCelebByNameOutput)
  searchCelebByName(
    @Args('input') searchCelebByName: SearchCelebByNameInput,
  ): Promise<SearchCelebByNameOutput> {
    return this.celebsService.searchCelebByName(searchCelebByName);
  }

  @Query(returns => SearchCelebsOutput)
  searchCelebs(
    @Args('input') searchCelebs: SearchCelebsInput,
  ): Promise<SearchCelebsOutput> {
    return this.celebsService.searchCelebs(searchCelebs);
  }

  @Query(returns => SearchCelebsByMonthOutput)
  searchCelebsByMonth(
    @Args('input') searchCelebsByMonth: SearchCelebsByMonthInput,
  ): Promise<SearchCelebsByMonthOutput> {
    return this.celebsService.searchCelebsByMonth(searchCelebsByMonth);
  }

  @Mutation(returns => EditCelebOutput)
  editCeleb(
    @Args('input') editCelebInput: EditCelebInput,
  ): Promise<EditCelebOutput> {
    return this.celebsService.editCeleb(editCelebInput);
  }

  @Mutation(returns => DeleteCelebOutput)
  deleteCeleb(
    @Args('input') deleteCelebInput: DeleteCelebInput,
  ): Promise<DeleteCelebOutput> {
    return this.celebsService.deleteCeleb(deleteCelebInput);
  }
}
