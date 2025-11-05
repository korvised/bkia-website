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

  @Column({ type: 'varchar', length: 100 })
  mimeType: string;

  @Column({ type: 'varchar', length: 500 })
  path: string;

  // Use bigint for large files
  @Column({ type: 'bigint', nullable: true })
  size?: string | null;

  @CreateDateColumn({ type: 'timestamptz' })
  uploadedAt: Date;
}
