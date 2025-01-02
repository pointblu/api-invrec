import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { UsersModule } from 'infrastructure/ioc/users.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { LocalStrategy } from 'infrastructure/strategies/local.strategy';
import { JwtStrategy } from 'infrastructure/strategies/jwt.strategy';
import { constants } from 'domain/shared/constants';
import { HttpModule } from '@nestjs/axios';
import { DatabaseModule } from './infrastructure/database/database.module';
import { LoggingMiddleware } from 'infrastructure/rest/middleware/http.midleware';
import { AuthModule } from 'infrastructure/ioc/auth.module';
import * as dotenv from 'dotenv';
dotenv.config();
@Module({
  imports: [
    DatabaseModule,
    ScheduleModule.forRoot(),
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    JwtModule.register({
      secretOrPrivateKey: `${constants.API_JWT_SECRET}`,
      secret: `${constants.API_JWT_SECRET}`,
      signOptions: { expiresIn: '24h' },
    }).module,
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [JwtService, LocalStrategy, JwtStrategy],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*'); // Aplica a todas las rutas
  }
}
