import { IsEnum, IsOptional, IsString } from 'class-validator';
import { UserStatus } from '@/types/enum';

export class QueryUserDto {
  @IsOptional()
  @IsString()
  empId: string;

  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsEnum(UserStatus)
  status: UserStatus;
}
