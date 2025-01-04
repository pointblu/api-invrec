import { Injectable } from '@nestjs/common';
import { Subscriptions } from 'infrastructure/database/mapper/Subscriptions.entity';
import { CreateSubscriptionDto } from 'presentation/view-models/subscriptions/createSubscription.dto';
import { UpdateSubscriptionsDto } from 'presentation/view-models/subscriptions/updateSubscription.dto';

@Injectable()
export abstract class ISubscriptionsUseCase {
  abstract getSubscriptions(): Promise<Subscriptions[]>;
  abstract getSubscriptionById(id: string): Promise<Subscriptions>;
  abstract createSubscription(
    body: CreateSubscriptionDto,
  ): Promise<Subscriptions>;
  abstract updateSubscription(
    subscriptionId: string,
    body: Partial<UpdateSubscriptionsDto>,
  ): Promise<Subscriptions>;
  abstract deleteSubscription(
    subscriptionId: string,
  ): Promise<{ id: string; message?: string }>;
}
