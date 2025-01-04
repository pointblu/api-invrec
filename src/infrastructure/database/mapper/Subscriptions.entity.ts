import { SubscriptionType } from 'domain/shared/enums/subscription-type.enum';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Users } from './Users.entity';

@Entity({ name: 'subscriptions' })
export class Subscriptions {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: SubscriptionType,
    default: SubscriptionType.PRUEBA,
    nullable: false,
  })
  type: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @Column({ type: 'timestamp', nullable: false })
  startDate: Date;

  @Column({ type: 'timestamp', nullable: false })
  endDate: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Column({
    type: 'enum',
    enum: ['active', 'inactive', 'expired'],
    default: 'active',
  })
  status: string;

  @ManyToOne(() => Users, (user) => user.subscription)
  @JoinColumn({ name: 'user_id' })
  user: Users;
}
