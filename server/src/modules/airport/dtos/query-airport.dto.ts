import { IsBooleanString, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '@/common/dtos';

export class QueryAirportDto extends PaginationDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsBooleanString()
  isActive?: string;
}
