import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, plainToClass } from 'class-transformer';
import { ResponseRequestDto } from '../../../infrastructure/rest/dto/response-request';
import { Subscriptions } from 'infrastructure/database/mapper/Subscriptions.entity';
import { SubscriptionType } from 'domain/shared/enums/subscription-type.enum';
export class SubscriptionVM {
  @Expose()
  @ApiProperty({
    description: 'Id of Subscription',
    example: 'd46f7074-5f44-44d2-8b79-92cb5d63bbc0',
    required: false,
    type: String,
  })
  id: string;

  @Expose()
  type: SubscriptionType;

  @ApiProperty({
    description: 'Precio de la suscripción',
    example: 9.99,
    type: Number,
  })
  @Expose()
  price: number;

  @ApiProperty({
    description: 'Fecha de inicio de la suscripción',
    example: '2023-10-01T00:00:00.000Z',
    type: Date,
  })
  @Expose()
  startDate: Date;

  @ApiProperty({
    description: 'Fecha de fin de la suscripción',
    example: '2023-11-01T00:00:00.000Z',
    type: Date,
  })
  @Expose()
  endDate: Date;

  @ApiPropertyOptional({
    description: 'Estado de la suscripción',
    example: 'active',
    enum: ['active', 'inactive', 'expired'],
    default: 'active',
  })
  @Expose()
  status?: string = 'active';

  static toViewModel(module: Subscriptions): SubscriptionVM {
    const result = plainToClass(SubscriptionVM, module, {
      excludeExtraneousValues: true,
    });
    return result;
  }

  static fromViewModel(mv: SubscriptionVM): Subscriptions {
    return plainToClass(Subscriptions, mv, { excludeExtraneousValues: true });
  }
}

export class ResponseSubscriptionVM extends ResponseRequestDto {
  @ApiProperty({
    type: Boolean,
    default: true,
  })
  success: boolean;
  @ApiProperty({
    type: SubscriptionVM,
  })
  data: SubscriptionVM;
}
