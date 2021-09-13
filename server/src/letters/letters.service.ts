import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Celeb } from 'src/celebs/entities/celeb.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
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
import { Letter, LetterStatusEnum } from './entities/letter.entity';

@Injectable()
export class LettersService {
  constructor(
    @InjectRepository(Letter)
    private readonly letters: Repository<Letter>,
    @InjectRepository(Celeb)
    private readonly celebs: Repository<Celeb>,
  ) {}

  async getAllLetters(): Promise<GetAllLettersOutput> {
    try {
      const letters = await this.letters.find();
      return { ok: true, letters };
    } catch (error) {
      return {
        ok: false,
        error: 'Cannot list the letters',
      };
    }
  }

  async getLettersByUser(user: User): Promise<GetLettersByUserOutput> {
    try {
      const letters = await this.letters.find({ where: { user } });
      return { ok: true, letters };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        error: 'Cannot list the letters',
      };
    }
  }

  async getLetterById(id: number): Promise<GetLetterByIdOutput> {
    try {
      const letter = await this.letters.findOne({ where: { id } });
      return {
        ok: true,
        letter,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Cannot find letter',
      };
    }
  }

  async loadLetter(user: User, id: number): Promise<LoadLetterOutput> {
    try {
      const letter = await this.letters.findOne({ where: { user, id } });
      if (!letter) {
        return { ok: false, error: 'Letter not found' };
      }
      if (letter.user !== user) {
        return { ok: false, error: 'Wrong User' };
      }
      return {
        ok: true,
        letter,
      };
    } catch {
      return {
        ok: false,
        error: 'Cannot load the letter',
      };
    }
  }

  async writeLetter(
    user: User,
    { celebId, contents, style, previewImage }: WriteLetterInput,
  ): Promise<WriteLetterOutput> {
    try {
      const celeb = await this.celebs.findOne({ where: { id: celebId } });
      if (!celeb) {
        return {
          ok: false,
          error: 'Cannot find celeb',
        };
      }
      await this.letters.save(
        this.letters.create({
          user,
          celeb,
          style,
          status: LetterStatusEnum.Writing,
          contents,
          previewImage,
        }),
      );
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Cannot write letter',
      };
    }
  }

  async confirmLetter(
    user: User,
    { id }: ConfirmLetterInput,
  ): Promise<ConfirmLetterOutput> {
    try {
      const letter = await this.getLetterById(id);
      await this.letters.save(
        this.letters.create({ ...letter, status: LetterStatusEnum.Finished }),
      );
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Cannot confirm letter',
      };
    }
  }

  async deleteLetter(
    user: User,
    { id }: DeleteLetterInput,
  ): Promise<DeleteLetterOutput> {
    try {
      const letter = await this.letters.findOne(id);
      if (!letter) {
        return {
          ok: false,
          error: 'Letter not found',
        };
      }
      if (letter.userId !== user.id) {
        return {
          ok: false,
          error: 'You cannot do that',
        };
      }
      await this.letters.delete(id);
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Cannot delete letter',
      };
    }
  }

  async deleteAllLetters(user: User): Promise<DeleteAllLettersOutput> {
    try {
      const { ok, error, letters: dbLetters } = await this.getAllLetters();
      if (!ok) {
        return { ok, error };
      }
      dbLetters.map(async letter => await this.letters.delete(letter.id));
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Cannot delete letter',
      };
    }
  }

  async editLetter(
    user: User,
    editLetterInput: EditLetterInput,
  ): Promise<EditLetterOutput> {
    try {
      const { ok, error, letter } = await this.loadLetter(
        user,
        editLetterInput.id,
      );
      if (!ok) {
        return { ok, error };
      }
      await this.letters.save([
        {
          id: editLetterInput.id,
          ...editLetterInput,
        },
      ]);
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Cannot edit letter',
      };
    }
  }
}
