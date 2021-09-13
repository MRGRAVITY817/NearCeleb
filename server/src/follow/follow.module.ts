import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CelebsModule } from 'src/celebs/celebs.module';
import { UsersModule } from 'src/users/users.module';
import { Follow } from './entities/follow.entity';
import { FollowResolver } from './follow.resolver';
import { FollowService } from './follow.service';

@Module({
  imports: [TypeOrmModule.forFeature([Follow]), CelebsModule],
  providers: [FollowResolver, FollowService],
  exports: [FollowService],
})
export class FollowModule {}
