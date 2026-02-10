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
import { NewsCategory } from '@/types/enum';
import { File } from './File.entity';

@Entity('news')
@Index(['category'])
@Index(['publishDate'])
@Index(['isPublished'])
@Index(['isFeatured'])
@Index(['slug'], { unique: true })
export class News {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // URL-friendly slug for SEO (e.g., "new-terminal-opening-2025")
  @Column({ type: 'varchar', length: 255, unique: true })
  slug: string;

  // Cover image (required for news)
  @ManyToOne(() => File, { nullable: false, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'coverImageId' })
  coverImage: File;

  // Multilingual title: { en: "...", lo: "...", zh: "..." }
  @Column({ type: 'jsonb' })
  title: Record<string, string>;

  // Multilingual excerpt/summary: { en: "...", lo: "...", zh: "..." }
  @Column({ type: 'jsonb' })
  excerpt: Record<string, string>;

  // Multilingual markdown content: { en: "...", lo: "...", zh: "..." }
  @Column({ type: 'jsonb' })
  content: Record<string, string>;

  @Column({
    type: 'enum',
    enum: NewsCategory,
    enumName: 'news_category_enum',
  })
  category: NewsCategory;

  // Author name (optional)
  @Column({ type: 'varchar', length: 255, nullable: true })
  author?: string | null;

  @Column({ type: 'date' })
  publishDate: string;

  // Featured news appear first/prominently on news page
  @Column({ type: 'boolean', default: false })
  isFeatured: boolean;

  // Published status (draft vs published)
  @Column({ type: 'boolean', default: false })
  isPublished: boolean;

  // View count for analytics
  @Column({ type: 'int', default: 0 })
  viewCount: number;

  // Multilingual tags array: [{ en: "...", lo: "...", zh: "..." }, ...]
  @Column({ type: 'jsonb', default: [] })
  tags: Record<string, string>[];

  // SEO meta description
  @Column({ type: 'jsonb', nullable: true })
  metaDescription?: Record<string, string> | null;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
