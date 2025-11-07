import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { FlightStatus, FlightType, Terminal } from '@/types/enum';
import { Airline, Counter, Route } from '@/database';

@Entity('flight')
@Index(['flightNo'])
@Index(['operationDate'])
@Index(['status'])
@Index(['airline'])
@Index(['operationDate', 'airline'])
export class Flight {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 20 })
  @Index()
  flightNo: string;

  @Column({
    type: 'enum',
    enum: FlightType,
    enumName: 'flight_type_enum',
  })
  type: FlightType;

  @Column({ type: 'enum', enum: Terminal, enumName: 'flight_terminal_enum' })
  terminal: Terminal;

  @Column({ type: 'varchar', length: 5, nullable: true })
  gate?: string | null;

  @Column({ type: 'date' })
  operationDate: string;

  @Column({ type: 'time' })
  scheduledDepTime: string;

  @Column({ type: 'time' })
  scheduledArrTime: string;

  @Column({ type: 'time', nullable: true })
  actualDepTime?: string | null;

  @Column({ type: 'time', nullable: true })
  actualArrTime?: string | null;

  // Check-in info (for departures)
  @Column({ type: 'time', nullable: true })
  checkInStartTime?: string | null;

  @Column({ type: 'time', nullable: true })
  checkInEndTime?: string | null;

  // Flight status
  @Column({
    type: 'enum',
    enum: FlightStatus,
    enumName: 'flight_status_enum',
    default: FlightStatus.SCHEDULED,
  })
  status: FlightStatus;

  @Column({ type: 'varchar', length: 255, nullable: true })
  remarks?: string | null;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @ManyToOne(() => Route, { nullable: false, onDelete: 'RESTRICT' })
  route: Route;

  @ManyToOne(() => Airline, (a) => a.flights, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  airline: Airline;

  @ManyToMany(() => Counter)
  @JoinTable({
    name: 'flight_checkin_counters',
    joinColumn: { name: 'flight_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'counter_id', referencedColumnName: 'id' },
  })
  checkInCounters: Counter[];
}
