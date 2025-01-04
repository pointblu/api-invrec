import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscriptions } from 'infrastructure/database/mapper/Subscriptions.entity';
import { ISubscriptionsRepository } from 'application/ports/Repository/SubscriptionsRepository/ISubscriptionsRepository.interface';
import { ISubscriptionsUseCase } from 'application/ports/UseCases/SubscriptionsUseCase/ISubscriptionsUseCase.interface';
import { SubscriptionsUseCase } from 'application/use-cases/SubscriptionsUseCase/SubscriptionsUseCase';
import { SubscriptionsRepository } from 'infrastructure/database/repositories/SubscriptionsRepository';
import { SubscriptionsController } from 'presentation/controllers/SubscriptionsController';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([Subscriptions]), // Reemplaza MongooseModule con TypeOrmModule
  ],
  controllers: [SubscriptionsController],
  providers: [
    {
      provide: ISubscriptionsUseCase,
      useClass: SubscriptionsUseCase,
    },
    {
      provide: ISubscriptionsRepository,
      useClass: SubscriptionsRepository,
    },
  ],
  exports: [
    {
      provide: ISubscriptionsUseCase,
      useClass: SubscriptionsUseCase,
    },
    {
      provide: ISubscriptionsRepository,
      useClass: SubscriptionsRepository,
    },
  ],
})
export class SubscriptionsModule {}
