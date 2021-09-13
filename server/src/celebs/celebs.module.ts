import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CelebsController } from './celebs.controller';
import { CelebsResolver } from './celebs.resolver';
import { CelebsService } from './celebs.service';
import { Celeb } from './entities/celeb.entity';
import { CelebInfo } from './entities/celebInfo.entity';
import { Roles } from './entities/roles.entity';
import { Social } from './entities/social.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Celeb, CelebInfo, Social, Roles])],
  controllers: [CelebsController],
  providers: [CelebsResolver, CelebsService],
  exports: [CelebsService],
})
export class CelebsModule {}
