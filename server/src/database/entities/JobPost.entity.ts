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

@Entity('job_posts')
@Index(['isPublished'])
@Index(['publishDate'])
export class JobPost {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /** Multilingual title: { en, lo, zh } */
  @Column({ type: 'jsonb' })
  title: Record<string, string>;

  /** Multilingual markdown job description: { en, lo, zh } */
  @Column({ type: 'jsonb' })
  content: Record<string, string>;

  /** Multilingual role/department name: { en, lo, zh } */
  @Column({ type: 'jsonb' })
  position: Record<string, string>;

  /** Number of openings for this posting */
  @Column({ type: 'int', default: 1 })
  vacancyCount: number;

  /** Optional cover image for the job post */
  @ManyToOne(() => File, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'coverImageId' })
  coverImage?: File | null;

  /** Published/draft status */
  @Column({ type: 'boolean', default: false })
  isPublished: boolean;

  /** Pinned to the home page as a featured position */
  @Column({ type: 'boolean', default: false })
  isFeatured: boolean;

  /** Date the posting goes live */
  @Column({ type: 'date' })
  publishDate: string;

  /** Application deadline (optional) */
  @Column({ type: 'date', nullable: true })
  deadline?: string | null;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
