import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { UsersModule } from 'src/users/users.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards';

@Module({
  imports: [UsersModule],
  providers: [
    { provide: APP_GUARD, useClass: AuthGuard },
    AuthService,
    AuthResolver,
  ],
})
export class AuthModule {}
