import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Auction } from './Auction.entity';
import { File } from './File.entity';

@Entity('auction_document')
export class AuctionDocument {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Auction, (auction) => auction.documents, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  auction: Auction;

  @ManyToOne(() => File, { nullable: false, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'fileId' })
  file: File;

  /** Multilingual display name shown on the public website */
  @Column({ type: 'jsonb' })
  fileName: Record<string, string>;

  @Column({ type: 'int', default: 0 })
  order: number;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}
