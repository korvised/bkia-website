import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { UserRole } from '@/types/enum';

export class UpdateRoleDto {
  @Transform(({ value }: { value?: string }) =>
    value ? value.toUpperCase() : value,
  )
  @IsOptional()
  @IsEnum(UserRole)
  role: UserRole;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsBoolean()
  status: boolean;
}
