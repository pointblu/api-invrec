import { PartialType } from '@nestjs/swagger';
import { CreateSubscriptionDto } from './createSubscription.dto';
export class UpdateSubscriptionsDto extends PartialType(
  CreateSubscriptionDto,
) {}
