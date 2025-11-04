import { IsBooleanString, IsIn, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '@/common/dtos';

export class QueryAirlineDto extends PaginationDto {
  @IsOptional()
  @IsString()
  search?: string; // Search by code or name

  @IsOptional()
  @IsBooleanString()
  isActive?: string; // 'true' | 'false'

  @IsOptional()
  @IsString()
  @IsIn(['code', 'name', 'createdAt'])
  orderBy?: 'code' | 'name' | 'createdAt';

  @IsOptional()
  @IsString()
  @IsIn(['ASC', 'DESC'])
  order?: 'ASC' | 'DESC';
}
