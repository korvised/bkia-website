import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { File } from './File.entity';

@Entity('career_activities')
@Index(['isActive'])
@Index(['sortOrder'])
export class CareerActivity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /** Activity photo (required) */
  @ManyToOne(() => File, { nullable: false, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'imageId' })
  image: File;

  /** Optional multilingual caption: { en?, lo?, zh? } */
  @Column({ type: 'jsonb', nullable: true })
  caption?: Record<string, string> | null;

  /** Display order in the gallery (lower = first) */
  @Column({ type: 'int', default: 0 })
  sortOrder: number;

  /** Whether this activity photo is visible on the public site */
  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}
