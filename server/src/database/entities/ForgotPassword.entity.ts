import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '@/database';

@Entity('forgot_password')
@Index(['email'])
@Index(['email', 'isUsed'])
@Index(['expiresAt'])
export class ForgotPassword {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 150 })
  email: string;

  @Column({ type: 'timestamptz' })
  expiresAt: Date;

  @Column({ type: 'boolean', default: false })
  isUsed: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.forgotPasswords, {
    onDelete: 'RESTRICT',
    nullable: true,
  })
  @JoinColumn({ name: 'userId' })
  user?: User | null;
}
