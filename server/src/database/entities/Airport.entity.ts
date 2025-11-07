import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Route } from '@/database';

@Entity('airport')
@Index(['code'], { unique: true })
export class Airport {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 10, unique: true })
  code: string;

  // Default display name (fallback if no translation available)
  @Column({ type: 'varchar', length: 255 })
  name: string;

  // Multilingual names (e.g. { en: "Vientiane", lo: "ວຽງຈັນ", zh: "万象" })
  @Column({ type: 'jsonb', default: {} })
  names: Record<string, string>;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @OneToMany(() => Route, (r) => r.origin)
  originRoutes: Route[];

  @OneToMany(() => Route, (r) => r.destination)
  destinationRoutes: Route[];
}
