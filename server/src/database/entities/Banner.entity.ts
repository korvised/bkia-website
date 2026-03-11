import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { File } from './File.entity';

@Entity('banner')
@Index(['order'])
@Index(['isActive'])
export class Banner {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Hero slide image (required)
  @ManyToOne(() => File, { nullable: false, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'imageId' })
  image: File;

  // Accessibility alt text: { en: "...", lo: "...", zh: "..." }
  @Column({ type: 'jsonb', default: {} })
  altText: Record<string, string>;

  // Optional overlay title: { en: "...", lo: "...", zh: "..." }
  @Column({ type: 'jsonb', nullable: true })
  title?: Record<string, string> | null;

  // Sort order (lower = first)
  @Column({ type: 'int', default: 0 })
  order: number;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
