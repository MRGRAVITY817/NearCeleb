import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Verification } from './entities/verification.entity';
import { UsersController } from './users.controller';
import { UsersResolver } from './resolvers/users.resolver';
import { UsersService } from './services/users.service';
import { UserInfoService } from './services/userInfo.service';
import { UserInfo } from './entities/userInfo.entity';
import { FollowModule } from 'src/follow/follow.module';
import { LettersModule } from 'src/letters/letters.module';
import { UserInfoResolver } from './resolvers/userInfo.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserInfo, Verification]),
    FollowModule,
    LettersModule,
  ],
  controllers: [UsersController],
  providers: [UsersResolver, UserInfoResolver, UsersService, UserInfoService],
  exports: [UsersService, UserInfoService],
})
export class UsersModule {}
