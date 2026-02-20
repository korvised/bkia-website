import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { LostFoundCategory, LostFoundType } from '@/types/enum';

export class QueryLostFoundDto {
  @IsOptional()
  @IsEnum(LostFoundType)
  type?: LostFoundType;

  @IsOptional()
  @IsEnum(LostFoundCategory)
  category?: LostFoundCategory;

  @IsOptional()
  @IsString()
  search?: string;

  // locale for display fields: en | lo | zh
  @IsOptional()
  @IsString()
  locale?: string;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @Min(1)
  @Max(50)
  limit?: number = 20;
}
