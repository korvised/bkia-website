import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { FeedbackCategory, FeedbackStatus, Terminal } from '@/types/enum';
import { File } from './File.entity';

@Entity('feedback')
@Index(['status'])
@Index(['category'])
@Index(['createdAt'])
export class Feedback {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int', nullable: true })
  rating: number | null;

  @Column({
    type: 'enum',
    enum: FeedbackCategory,
    enumName: 'feedback_category_enum',
  })
  category: FeedbackCategory;

  @Column({ type: 'text', nullable: true })
  comment: string | null;

  @Column({
    type: 'enum',
    enum: Terminal,
    enumName: 'terminal_enum',
    nullable: true,
  })
  terminal: Terminal | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  specificArea: string | null;

  @Column({ type: 'boolean', default: false })
  followUp: boolean;

  @Column({ type: 'varchar', length: 150, nullable: true })
  email: string | null;

  @Column({ type: 'varchar', length: 30, nullable: true })
  phone: string | null;

  @Column({
    type: 'enum',
    enum: FeedbackStatus,
    enumName: 'feedback_status_enum',
    default: FeedbackStatus.NEW,
  })
  status: FeedbackStatus;

  @ManyToMany(() => File, { cascade: ['insert'], eager: false })
  @JoinTable({
    name: 'feedback_files',
    joinColumn: { name: 'feedbackId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'fileId', referencedColumnName: 'id' },
  })
  files: File[];

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
