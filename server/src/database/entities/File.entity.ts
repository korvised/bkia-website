import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('file')
@Index(['mimeType'])
export class File {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  originalName: string;

  // Use MIME type for clarity (e.g. "image/png")
  @Column({ type: 'varchar', length: 100 })
  mimeType: string;

  // Keep a long path for safety (S3 key/local path)
  @Column({ type: 'varchar', length: 500 })
  path: string;

  // Use bigint for large files
  @Column({ type: 'bigint', nullable: true })
  size?: string | null; // bigint maps to string in JS

  @CreateDateColumn({ type: 'timestamptz' })
  uploadedAt: Date;
}
