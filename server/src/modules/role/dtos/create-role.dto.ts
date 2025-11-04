import {
  IsBoolean,
  IsDefined,
  IsEnum,
  IsOptional,
  IsString
} from 'class-validator';
import { Transform } from 'class-transformer';
import { UserRole } from '@/types/enum';

export class CreateRoleDto {
  @Transform(({ value }) => (value as string).toUpperCase())
  @IsDefined()
  @IsEnum(UserRole)
  role: UserRole;

  @IsOptional()
  @IsString()
  description: string;

  @IsDefined()
  @IsBoolean()
  status: boolean;
}
