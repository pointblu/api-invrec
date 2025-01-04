import {
  Injectable,
  HttpException,
  HttpStatus,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { ISubscriptionsRepository } from 'application/ports/Repository/SubscriptionsRepository/ISubscriptionsRepository.interface';
import { ISubscriptionsUseCase } from 'application/ports/UseCases/SubscriptionsUseCase/ISubscriptionsUseCase.interface';
import { Subscriptions } from 'infrastructure/database/mapper/Subscriptions.entity';
import { MESSAGE_RESPONSES } from 'domain/shared/message_errors';
import { UpdateSubscriptionsDto } from 'presentation/view-models/subscriptions/updateSubscription.dto';
import { CreateSubscriptionDto } from 'presentation/view-models/subscriptions/createSubscription.dto';

@Injectable()
export class SubscriptionsUseCase implements ISubscriptionsUseCase {
  constructor(private readonly subscriptionsRepo: ISubscriptionsRepository) {}

  getSubscriptions(): Promise<Subscriptions[]> {
    return this.subscriptionsRepo.findAll();
  }

  async getSubscriptionById(id: string): Promise<Subscriptions> {
    try {
      const result = await this.subscriptionsRepo.findOne(id);
      if (!result) {
        throw new HttpException(
          { message: MESSAGE_RESPONSES.SUBSCRIPTIONS.SUBSCRIPTION_NOT_FOUND },
          HttpStatus.NOT_FOUND,
        );
      }
      return result;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  async createSubscription(
    body: CreateSubscriptionDto,
  ): Promise<Subscriptions> {
    try {
      return await this.subscriptionsRepo.create(body);
    } catch (error) {
      Logger.error(error);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  async updateSubscription(
    subscriptionId: string,
    body: Partial<UpdateSubscriptionsDto>,
  ): Promise<Subscriptions> {
    try {
      await this.subscriptionsRepo.update(subscriptionId, body);
      return await this.getSubscriptionById(subscriptionId);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }
  async deleteSubscription(
    subscriptionId: string,
  ): Promise<{ id: string; message?: string }> {
    try {
      const exists = await this.getSubscriptionById(subscriptionId);
      await this.subscriptionsRepo.deleteOne(subscriptionId);
      return {
        id: String(exists.id),
        message: MESSAGE_RESPONSES.SUBSCRIPTIONS.SUBSCRIPTION_DELETED,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }
}
