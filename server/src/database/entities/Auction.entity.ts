import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AuctionCategory, AuctionStatus } from '@/types/enum';
import { AuctionDocument } from './AuctionDocument.entity';

@Entity('auction')
@Index(['status'])
@Index(['category'])
@Index(['startDate'])
@Index(['endDate'])
export class Auction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'jsonb' })
  title: Record<string, string>;

  @Column({ type: 'jsonb' })
  description: Record<string, string>;

  @Column({ type: 'enum', enum: AuctionCategory })
  category: AuctionCategory;

  @Column({ type: 'timestamptz' })
  startDate: Date;

  @Column({ type: 'timestamptz' })
  endDate: Date;

  @Column({
    type: 'enum',
    enum: AuctionStatus,
    default: AuctionStatus.UPCOMING,
  })
  status: AuctionStatus;

  @OneToMany(() => AuctionDocument, (doc) => doc.auction, {
    cascade: ['insert', 'update'],
  })
  documents: AuctionDocument[];

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
