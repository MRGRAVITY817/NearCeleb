import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/decorators/authUser.decorator';
import { Role } from 'src/auth/decorators/role.decorator';
import { User } from 'src/users/entities/user.entity';
import {
  ConfirmLetterInput,
  ConfirmLetterOutput,
  DeleteAllLettersOutput,
  DeleteLetterInput,
  DeleteLetterOutput,
  EditLetterInput,
  EditLetterOutput,
  GetAllLettersOutput,
  GetLetterByIdOutput,
  GetLettersByUserOutput,
  LoadLetterOutput,
  WriteLetterInput,
  WriteLetterOutput,
} from './dtos';
import { Letter } from './entities/letter.entity';
import { LettersService } from './letters.service';

@Resolver(of => Letter)
export class LettersResolver {
  constructor(private readonly lettersService: LettersService) {}

  @Query(returns => GetAllLettersOutput)
  getAllLetters(): Promise<GetAllLettersOutput> {
    return this.lettersService.getAllLetters();
  }

  @Query(returns => GetLetterByIdOutput)
  getLetterById(id: number): Promise<GetLetterByIdOutput> {
    return this.lettersService.getLetterById(id);
  }

  @Role(['Fans', 'Admin'])
  @Query(returns => GetLettersByUserOutput)
  getLettersByUser(@AuthUser() user: User): Promise<GetLettersByUserOutput> {
    return this.lettersService.getLettersByUser(user);
  }

  @Role(['Fans', 'Admin'])
  @Query(returns => LoadLetterOutput)
  loadLetter(@AuthUser() user: User, id: number): Promise<LoadLetterOutput> {
    return this.lettersService.loadLetter(user, id);
  }

  @Role(['Fans', 'Admin'])
  @Mutation(returns => WriteLetterOutput)
  writeLetter(
    @AuthUser() user: User,
    @Args('input') writeLetterInput: WriteLetterInput,
  ): Promise<WriteLetterOutput> {
    return this.lettersService.writeLetter(user, writeLetterInput);
  }

  @Role(['Fans', 'Admin'])
  @Mutation(returns => ConfirmLetterOutput)
  confirmLetter(
    @AuthUser() user: User,
    @Args('input') confirmLetterInput: ConfirmLetterInput,
  ): Promise<ConfirmLetterOutput> {
    return this.lettersService.confirmLetter(user, confirmLetterInput);
  }

  @Role(['Fans', 'Admin'])
  @Mutation(returns => DeleteLetterOutput)
  deleteLetter(
    @AuthUser() user: User,
    @Args('input') deleteLetterInput: DeleteLetterInput,
  ): Promise<DeleteLetterOutput> {
    return this.lettersService.deleteLetter(user, deleteLetterInput);
  }

  @Role(['Fans', 'Admin'])
  @Mutation(returns => DeleteAllLettersOutput)
  deleteAllLetters(@AuthUser() user: User): Promise<DeleteLetterOutput> {
    return this.lettersService.deleteAllLetters(user);
  }

  @Role(['Fans', 'Admin'])
  @Mutation(returns => EditLetterOutput)
  editLetter(
    @AuthUser() user: User,
    editLetterInput: EditLetterInput,
  ): Promise<EditLetterOutput> {
    return this.lettersService.editLetter(user, editLetterInput);
  }
}
