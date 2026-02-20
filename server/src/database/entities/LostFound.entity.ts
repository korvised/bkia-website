import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  LostFoundCategory,
  LostFoundStatus,
  LostFoundType,
  LostFoundVisibility,
} from '@/types/enum';
import { File } from './File.entity';
import { User } from './User.entity';

@Entity('lost_found')
@Index(['type'])
@Index(['status'])
@Index(['category'])
@Index(['visibility'])
@Index(['incidentDate'])
export class LostFound {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: LostFoundType,
    enumName: 'lost_found_type_enum',
  })
  type: LostFoundType;

  @Column({
    type: 'enum',
    enum: LostFoundStatus,
    enumName: 'lost_found_status_enum',
    default: LostFoundStatus.OPEN,
  })
  status: LostFoundStatus;

  @Column({
    type: 'enum',
    enum: LostFoundCategory,
    enumName: 'lost_found_category_enum',
  })
  category: LostFoundCategory;

  // Content moderation — new submissions hidden until staff approves
  @Column({
    type: 'enum',
    enum: LostFoundVisibility,
    enumName: 'lost_found_visibility_enum',
    default: LostFoundVisibility.PENDING_REVIEW,
  })
  visibility: LostFoundVisibility;

  // Staff who approved/rejected visibility
  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'reviewedById' })
  reviewedBy: User | null;

  @Column({ type: 'timestamptz', nullable: true })
  reviewedAt: Date | null;

  // Reason if hidden e.g. "spam", "inappropriate content", "duplicate"
  @Column({ type: 'varchar', length: 255, nullable: true })
  hideReason: string | null;

  @Column({ type: 'varchar', length: 255 })
  itemName: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  location: string | null;

  @Column({ type: 'jsonb', default: {} })
  displayNames: Record<string, string>;

  @Column({ type: 'jsonb', default: {} })
  displayDescriptions: Record<string, string>;

  @Column({ type: 'jsonb', default: {} })
  displayLocations: Record<string, string>;

  @Column({ type: 'timestamptz' })
  incidentDate: Date;

  @Column({ type: 'varchar', length: 20, nullable: true })
  flightNumber: string | null;

  @Column({ type: 'varchar', length: 255 })
  reporterName: string;

  @Column({ type: 'varchar', length: 150 })
  reporterEmail: string;

  @Column({ type: 'varchar', length: 30, nullable: true })
  reporterPhone: string | null;

  @Column({ type: 'varchar', length: 30, unique: true })
  referenceCode: string;

  @Column({ type: 'text', nullable: true })
  staffNote: string | null;

  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'handledById' })
  handledBy: User | null;

  @Column({ type: 'timestamptz', nullable: true })
  resolvedAt: Date | null;

  @ManyToMany(() => File, { cascade: ['insert'], eager: false })
  @JoinTable({
    name: 'lost_found_images',
    joinColumn: { name: 'lostFoundId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'fileId', referencedColumnName: 'id' },
  })
  images: File[];

  @ManyToOne(() => File, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'coverFileId' })
  coverImage: File | null;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
