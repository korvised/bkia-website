import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RouteType } from '@/types/enum';
import { Airport } from '@/database';

@Entity('route')
@Index(['departure'])
@Index(['arrival'])
export class Route {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: RouteType, name: 'route_type_enum' })
  routeType: RouteType;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @ManyToOne(() => Airport, (airport) => airport.departures, {
    nullable: false,
  })
  departure: Airport;

  @ManyToOne(() => Airport, (airport) => airport.arrivals, {
    nullable: false,
  })
  arrival: Airport;
}
