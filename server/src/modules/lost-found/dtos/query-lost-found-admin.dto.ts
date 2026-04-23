import { IsEnum, IsOptional } from 'class-validator';
import { LostFoundStatus } from '@/types/enum';
import { QueryLostFoundDto } from './query-lost-found.dto';

export class QueryLostFoundAdminDto extends QueryLostFoundDto {
  @IsOptional()
  @IsEnum(LostFoundStatus)
  status?: LostFoundStatus;
}
