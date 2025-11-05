import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from '@/types/enum';

@Entity('role')
@Index(['role'], { unique: true })
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    enumName: 'user_role_enum',
    unique: true,
  })
  role: UserRole;

  @Column({ type: 'varchar', length: 255, nullable: true })
  description?: string | null;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;
}
