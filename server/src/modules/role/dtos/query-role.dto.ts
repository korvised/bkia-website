import { IsBooleanString, IsOptional } from 'class-validator';

export class QueryRoleDto {
  @IsOptional()
  @IsBooleanString()
  isActive?: string;
}
