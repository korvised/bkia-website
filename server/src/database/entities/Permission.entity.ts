import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('permission')
@Index(['slug'], { unique: true })
export class Permission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string; // e.g., "Create Flight"

  @Column()
  slug: string; // e.g., "flight:create" - Use this in your code checks

  @Column({ nullable: true })
  description: string;
}
