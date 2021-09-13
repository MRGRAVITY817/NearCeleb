import * as Joi from 'joi';
import * as fs from 'fs';
import * as path from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { CelebsModule } from './celebs/celebs.module';
import { UsersModule } from './users/users.module';
import { JwtModule } from './jwt/jwt.module';
import { AuthModule } from './auth/auth.module';
import { LettersModule } from './letters/letters.module';
import { PaymentsModule } from './payments/payments.module';
import { FontsModule } from './fonts/fonts.module';
import { TrendsModule } from './trends/trends.module';
import { StorageModule } from './storage/storage.module';
import { FollowModule } from './follow/follow.module';
import { VotesModule } from './votes/votes.module';
import { User } from './users/entities/user.entity';
import { Verification } from './users/entities/verification.entity';
import { Celeb } from './celebs/entities/celeb.entity';
import { Letter } from './letters/entities/letter.entity';
import { Payment } from './payments/entities/payment.entity';
import { Font } from './fonts/entities/fonts.entity';
import { Social } from './celebs/entities/social.entity';
import { Roles } from './celebs/entities/roles.entity';
import { Trend } from './trends/entities/trend.entity';
import { Follow } from './follow/entities/follow.entity';
import { Vote } from './votes/entities/vote.entity';
import { CelebInfo } from './celebs/entities/celebInfo.entity';
import { UserInfo } from './users/entities/userInfo.entity';
import { AddVote } from './votes/entities/addVote.entity';
import { EditVote } from './votes/entities/editVote.entity';
import { DeleteVote } from './votes/entities/deleteVote.entity';
import { UserVote } from './users/entities/userVote.entity';
import { CelebVote } from './celebs/entities/celebVote.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'test' ? '.env.test' : '.env.dev',
      ignoreEnvFile: process.env.NODE_ENV === 'production',
      // validationSchema will make program NOT to open when the env variables are not ready
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'production', 'test').required(),
        DB_PASSWORD: Joi.string().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        PRIVATE_KEY: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      logging: true,
      entities: [
        User,
        UserInfo,
        Verification,
        Celeb,
        CelebInfo,
        Letter,
        Social,
        Roles,
        Payment,
        Font,
        Trend,
        User,
        Follow,
        AddVote,
        EditVote,
        DeleteVote,
        UserVote,
        CelebVote,
      ],
      ssl: process.env.NODE_ENV === 'production' && {
        rejectUnauthorized: false,
        ca: fs
          .readFileSync(path.join(__dirname, '../certs/out/myCA.crt'))
          .toString(),
        key: fs
          .readFileSync(path.join(__dirname, '../certs/out/postgresdb.key'))
          .toString(),
        cert: fs
          .readFileSync(path.join(__dirname, '../certs/out/postgresdb.crt'))
          .toString(),
      },
    }),
    GraphQLModule.forRoot({
      playground: true,
      introspection: true,
      autoSchemaFile: true,
      installSubscriptionHandlers: true,
      context: ({ req, connection }) => {
        const TOKEN_KEY = 'x-jwt';
        return {
          token: req ? req.headers[TOKEN_KEY] : connection.context[TOKEN_KEY],
        };
      },
    }),
    JwtModule.forRoot({
      privateKey: process.env.PRIVATE_KEY,
    }),
    CelebsModule,
    UsersModule,
    AuthModule,
    LettersModule,
    PaymentsModule,
    FontsModule,
    TrendsModule,
    StorageModule,
    FollowModule,
    VotesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
