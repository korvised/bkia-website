import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { Terminal } from '@/types/enum';

@Entity('counter')
@Index(['name', 'terminal'], { unique: true })
export class Counter {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: Terminal,
  })
  terminal: Terminal;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;
}
