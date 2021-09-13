import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Celeb } from 'src/celebs/entities/celeb.entity';
import { Letter } from './entities/letter.entity';
import { LettersController } from './letters.controller';
import { LettersResolver } from './letters.resolver';
import { LettersService } from './letters.service';

@Module({
  imports: [TypeOrmModule.forFeature([Letter, Celeb])],
  controllers: [LettersController],
  providers: [LettersService, LettersResolver],
  exports: [LettersService],
})
export class LettersModule {}
