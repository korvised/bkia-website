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
import { User } from './User.entity';

@Entity('forgot_password')
@Index(['email'])
@Index(['email', 'isUsed'])
@Index(['expiresAt'])
export class ForgotPassword {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Store the email for robustness even if user is deleted/changed
  @Column({ type: 'varchar', length: 150 })
  email: string;

  // When this reset link/token expires
  @Column({ type: 'timestamptz' })
  expiresAt: Date;

  // Was it consumed?
  @Column({ type: 'boolean', default: false })
  isUsed: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  // Link to user if available; keep RESTRICT to avoid accidental cascades
  @ManyToOne(() => User, (user) => user.forgotPasswords, {
    onDelete: 'RESTRICT',
    nullable: true,
  })
  @JoinColumn({ name: 'userId' })
  user?: User | null;
}
