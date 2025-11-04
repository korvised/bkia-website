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
import { File } from './File.entity';
import { Flight } from './Flight.entity';

@Entity('airline')
@Index(['code'], { unique: true })
export class Airline {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // IATA/ICAO (up to 3/4)
  @Column({ type: 'varchar', length: 8 })
  code: string;

  // One logo file per airline (nullable; keep image decoupled via File entity)
  @OneToOne(() => File, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'logoFileId' })
  logoFile?: File | null;

  @Column({ type: 'varchar', length: 255 })
  name: string;

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
