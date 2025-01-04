import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { UserRole } from '../../../domain/shared/enums/user-role.enum';
import { Subscriptions } from './Subscriptions.entity';

@Entity({ name: 'users' })
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
    nullable: false,
  })
  role: UserRole;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  password: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  salt: string;

  @Column({ type: 'boolean', default: false })
  status: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true, default: null })
  verificationCode: string;

  @Column({ type: 'varchar', length: 255, nullable: true, default: null })
  recuperationCode: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @OneToOne(() => Subscriptions, (subscription) => subscription.user, {
    eager: true,
  }) // eager: true para popular la suscripción automáticamente
  @JoinColumn({ name: 'subscription_id' })
  subscription: Subscriptions;
}
