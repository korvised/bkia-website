import { IsEnum, IsOptional, IsString, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ClaimStatus, LostFoundCategory } from '@/types/enum';

export class QueryClaimsDto {
  @IsOptional()
  @IsEnum(ClaimStatus)
  status?: ClaimStatus;

  @IsOptional()
  @IsEnum(LostFoundCategory)
  category?: LostFoundCategory;

  @IsOptional()
  @IsString()
  linked?: 'true' | 'false';

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @Type(() => Number)
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @Min(1)
  @Max(50)
  limit?: number = 20;
}
