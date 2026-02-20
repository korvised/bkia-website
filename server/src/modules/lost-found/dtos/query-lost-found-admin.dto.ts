import { IsEnum, IsOptional } from 'class-validator';
import { LostFoundStatus, LostFoundVisibility } from '@/types/enum';
import { QueryLostFoundDto } from './query-lost-found.dto';

export class QueryLostFoundAdminDto extends QueryLostFoundDto {
  @IsOptional()
  @IsEnum(LostFoundStatus)
  status?: LostFoundStatus;

  @IsOptional()
  @IsEnum(LostFoundVisibility)
  visibility?: LostFoundVisibility;
}
