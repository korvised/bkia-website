import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  OneToMany,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { File, Flight } from '@/database';

@Entity('airline')
@Index(['code'], { unique: true })
export class Airline {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // IATA/ICAO or internal code
  @Column({ type: 'varchar', length: 20 })
  code: string;

  @OneToOne(() => File, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'logoFileId' })
  logoFile?: File | null;

  // Default display name (fallback if translation missing)
  @Column({ type: 'varchar', length: 255 })
  name: string;

  // Multilingual names, e.g. { en: "Lao Airlines", lo: "ການບິນລາວ", zh: "老挝航空" }
  @Column({ type: 'jsonb', default: {} })
  names: Record<string, string>;

  @Column({ type: 'varchar', length: 30, nullable: true })
  hotline?: string | null;

  @Column({ type: 'varchar', length: 30, nullable: true })
  phone?: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  website?: string | null;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @OneToMany(() => Flight, (f) => f.airline)
  flights: Flight[];
}
