import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BetModule } from './bet/bet.module';
import { RoundModule } from './round/round.module';
import { ResultModule } from './result/result.module';
import { Bet } from './bet/bet.entity';
import { Round } from './round/round.entity';
import { Result } from './result/result.entity';

@Module({
  imports: [
    ConfigModule.forRoot(), 
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'digit_draw',
      entities: [Bet, Round, Result],
      autoLoadEntities: true,
      synchronize: true,  // Use only in development; in production, use migrations
    }),
    UsersModule,
    AuthModule,
    BetModule,
    RoundModule,
    ResultModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}