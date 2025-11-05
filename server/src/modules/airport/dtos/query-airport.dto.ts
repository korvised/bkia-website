import { IsBooleanString, IsOptional, IsString } from 'class-validator';

export class QueryAirportDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsBooleanString()
  isActive?: string;
}
