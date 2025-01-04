import { Injectable } from '@nestjs/common';
import { Subscriptions } from 'infrastructure/database/mapper/Subscriptions.entity';
import { IRepository } from 'application/ports/Repository/IRepository.interface';
@Injectable()
export abstract class ISubscriptionsRepository extends IRepository<Subscriptions> {}
