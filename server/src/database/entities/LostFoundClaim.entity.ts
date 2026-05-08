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
import { ClaimStatus, LostFoundCategory } from '@/types/enum';
import { File } from './File.entity';
import { LostFound } from './LostFound.entity';
import { User } from './User.entity';

@Entity('lost_found_claim')
@Index(['referenceCode'], { unique: true })
export class LostFoundClaim {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => LostFound, (lf) => lf.claims, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'lostFoundId' })
  lostFound: LostFound | null;

  @Column({
    type: 'enum',
    enum: ClaimStatus,
    enumName: 'claim_status_enum',
    default: ClaimStatus.PENDING,
  })
  status: ClaimStatus;

  @Column({ type: 'varchar', length: 30, unique: true })
  referenceCode: string;

  // ── Standalone claim context (populated when no linked item) ───
  @Column({
    type: 'enum',
    enum: LostFoundCategory,
    enumName: 'lost_found_category_enum',
    nullable: true,
  })
  category: LostFoundCategory | null;

  @Column({ type: 'text', nullable: true })
  itemDescription: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  lostLocation: string | null;

  @Column({ type: 'timestamptz', nullable: true })
  lostDate: Date | null;

  // ── Claimant info ─────────────────────────────────────────────
  @Column({ type: 'varchar', length: 255 })
  claimantName: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  claimantEmail: string | null;

  @Column({ type: 'varchar', length: 30, nullable: true })
  claimantPhone: string | null;

  @Column({ type: 'varchar', length: 20, nullable: true })
  flightNumber: string | null;

  @Column({ type: 'varchar', length: 20, nullable: true })
  seatNumber: string | null;

  @Column({ type: 'text' })
  ownershipProof: string;

  // Multi proof images: ID card, boarding pass, receipt, etc.
  @ManyToMany(() => File, { cascade: ['insert'], eager: false })
  @JoinTable({
    name: 'lost_found_claim_proofs',
    joinColumn: { name: 'claimId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'fileId', referencedColumnName: 'id' },
  })
  proofFiles: File[];

  @Column({ type: 'text', nullable: true })
  staffNote: string | null;

  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'reviewedById' })
  reviewedBy: User | null;

  @Column({ type: 'timestamptz', nullable: true })
  reviewedAt: Date | null;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
