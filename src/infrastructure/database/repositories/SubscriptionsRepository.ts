import { Injectable } from '@nestjs/common';
import { Subscriptions } from '../mapper/Subscriptions.entity';
import { BaseRepository } from './BaseRepository';
import { InjectRepository, InjectDataSource } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { ISubscriptionsRepository } from 'application/ports/Repository/SubscriptionsRepository/ISubscriptionsRepository.interface';

@Injectable()
export class SubscriptionsRepository
  extends BaseRepository<Subscriptions>
  implements ISubscriptionsRepository
{
  constructor(
    @InjectRepository(Subscriptions)
    repository: Repository<Subscriptions>,
    @InjectDataSource()
    dataSource: DataSource,
  ) {
    super(repository, dataSource); // Pasar ambos argumentos
  }
}
