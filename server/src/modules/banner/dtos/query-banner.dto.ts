import { IsOptional, IsString } from 'class-validator';

export class QueryBannerDto {
  @IsOptional()
  @IsString()
  isActive?: string;

  @IsOptional()
  @IsString()
  page?: string;

  @IsOptional()
  @IsString()
  limit?: string;
}
