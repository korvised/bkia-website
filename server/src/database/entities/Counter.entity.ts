import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';
import { CounterArea } from '@/types/enum';

@Entity('counter')
@Index(['name', 'area'], { unique: true })
export class Counter {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: CounterArea,
    enumName: 'counter_area_enum',
  })
  area: CounterArea;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;
}
