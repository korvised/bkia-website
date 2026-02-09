import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ImportantPriority } from '@/types/enum';

@Entity('notice')
@Index(['priority'])
@Index(['publishDate'])
@Index(['effectiveDate'])
@Index(['expiryDate'])
@Index(['isActive'])
export class Notice {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Multilingual title: { en: "...", lo: "...", zh: "..." }
  @Column({ type: 'jsonb' })
  title: Record<string, string>;

  // Multilingual description (plain text): { en: "...", lo: "...", zh: "..." }
  @Column({ type: 'jsonb' })
  description: Record<string, string>;

  // Multilingual markdown content: { en: "# Title\n...", lo: "# ຫົວຂໍ້\n...", zh: "# 标题\n..." }
  @Column({ type: 'jsonb' })
  content: Record<string, string>;

  @Column({
    type: 'enum',
    enum: ImportantPriority,
    enumName: 'notice_priority_enum',
    default: ImportantPriority.NORMAL,
  })
  priority: ImportantPriority;

  @Column({ type: 'date' })
  publishDate: string;

  @Column({ type: 'date', nullable: true })
  effectiveDate?: string | null;

  @Column({ type: 'date', nullable: true })
  expiryDate?: string | null;

  // Multilingual tags array: [{ en: "...", lo: "...", zh: "..." }, ...]
  @Column({ type: 'jsonb', default: [] })
  tags: Record<string, string>[];

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
