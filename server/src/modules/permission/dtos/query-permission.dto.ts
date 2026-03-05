import { IsOptional, IsString } from 'class-validator';

export class QueryPermissionDto {
  @IsOptional()
  @IsString()
  search?: string;
}
