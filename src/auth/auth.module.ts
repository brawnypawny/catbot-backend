import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    JwtModule.register({
      global: true,
      secret: process.env.KIND_OF_CONFIDENTIAL,
      signOptions: { expiresIn: '1000000000s' },   //delete if trouble 
    }),
  ],
  providers: [ AuthService,
  {
    provide: APP_GUARD,
    useClass: AuthGuard,
  },
],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
