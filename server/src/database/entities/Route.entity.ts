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
@Index(['origin'])
@Index(['destination'])
@Index(['origin', 'destination', 'routeType'], { unique: true })
export class Route {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: RouteType, enumName: 'route_type_enum' })
  routeType: RouteType;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @ManyToOne(() => Airport, (airport) => airport.originRoutes, {
    nullable: false,
  })
  origin: Airport;

  @ManyToOne(() => Airport, (airport) => airport.destinationRoutes, {
    nullable: false,
  })
  destination: Airport;
}
