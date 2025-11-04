import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  Index,
} from 'typeorm';
import { Airline } from './Airline.entity';
import { Counter } from './Counter.entity';
import { FlightStatus } from '@/types/enum';

@Entity('flight')
@Index(['operationDate'])
@Index(['status'])
@Index(['airline'])
@Index(['operationDate', 'airline'])
export class Flight {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Route: normalize into origin/destination codes (IATA recommended).
  @Column({ type: 'varchar', length: 8 })
  originCode: string;

  @Column({ type: 'varchar', length: 8 })
  destinationCode: string;

  // Optional via points, e.g. ["URT", "BKK"]
  @Column({ type: 'varchar', array: true, nullable: true })
  viaCodes?: string[] | null;

  // Operation date (local airport ops date)
  @Column({ type: 'date' })
  operationDate: string;

  // Times (local). Use 'time' in Postgres (without TZ).
  @Column({ type: 'time' })
  scheduledTime: string;

  @Column({ type: 'time', nullable: true })
  actualTime?: string | null;

  // Check-in window
  @Column({ type: 'time', nullable: true })
  checkInStartTime?: string | null;

  @Column({ type: 'time', nullable: true })
  checkInEndTime?: string | null;

  // Check-in counters (e.g., counters A1, A2). Many-to-many for flexibility.
  @ManyToMany(() => Counter, { eager: false })
  @JoinTable({
    name: 'flight_checkin_counters',
    joinColumn: { name: 'flightId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'counterId', referencedColumnName: 'id' },
  })
  checkInCounters: Counter[];

  // Airline relation
  @ManyToOne(() => Airline, (a) => a.flights, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  airline: Airline;

  // Aircraft model/registration (free text; keep flexible)
  @Column({ type: 'varchar', length: 100, nullable: true })
  aircraft?: string | null;

  // Flight status
  @Column({
    type: 'enum',
    enum: FlightStatus,
    enumName: 'flight_status_enum',
    default: FlightStatus.SCHEDULED,
  })
  status: FlightStatus;
}
