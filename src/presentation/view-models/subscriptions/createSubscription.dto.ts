import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { SubscriptionType } from 'domain/shared/enums/subscription-type.enum';

export class CreateSubscriptionDto {
  @ApiProperty({
    description: 'Tipo de suscripción',
    example: SubscriptionType.PRUEBA,
    enum: SubscriptionType,
    type: String,
  })
  @IsString()
  @Expose()
  type: SubscriptionType;

  @ApiProperty({
    description: 'Precio de la suscripción',
    example: 9.99,
    type: Number,
  })
  @IsNumber()
  @Expose()
  price: number;

  @ApiProperty({
    description: 'Fecha de inicio de la suscripción',
    example: '2023-10-01T00:00:00.000Z',
    type: Date,
  })
  @IsDate()
  @Expose()
  @Transform(({ value }) => (value ? new Date(value) : value))
  startDate: Date;

  @ApiProperty({
    description: 'Fecha de fin de la suscripción',
    example: '2023-11-01T00:00:00.000Z',
    type: Date,
  })
  @IsDate()
  @Expose()
  @Transform(({ value }) => (value ? new Date(value) : value))
  endDate: Date;

  @ApiPropertyOptional({
    description: 'Estado de la suscripción',
    example: 'active',
    enum: ['active', 'inactive', 'expired'],
    default: 'active',
  })
  @IsOptional()
  @IsString()
  @IsEnum(['active', 'inactive', 'expired'])
  @Expose()
  status?: string = 'active';
}
