import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';
import { TerminalZone } from '@/types/enum';

@Entity('counter')
@Index(['name', 'zone'], { unique: true })
export class Counter {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: TerminalZone,
    enumName: 'terminal_zone_enum',
  })
  zone: TerminalZone;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;
}
