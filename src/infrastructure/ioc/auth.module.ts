import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { constants } from 'domain/shared/constants';
import { LocalStrategy } from '../strategies/local.strategy';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { AuthService } from 'domain/services/auth/auth.service';
import { IAuthService } from 'domain/services/auth/IAuthService.interface';
import { UsersModule } from './users.module';
import { HttpModule } from '@nestjs/axios';
import { AuthController } from 'presentation/controllers/AuthController';
@Module({
  controllers: [AuthController],
  providers: [
    {
      provide: IAuthService,
      useClass: AuthService,
    },
    LocalStrategy,
    JwtStrategy,
  ],
  imports: [
    UsersModule,
    HttpModule,
    PassportModule,
    JwtModule.register({
      secret: constants.API_JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  exports: [
    {
      provide: IAuthService,
      useClass: AuthService,
    },
  ],
})
export class AuthModule {}
