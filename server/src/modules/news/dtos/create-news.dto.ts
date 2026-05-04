import { Transform } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Length,
  Matches,
  Min,
} from 'class-validator';
import { NewsCategory } from '@/types/enum';
import { MultilingualTextDto } from '@/common/dtos';
import { IsJsonColumn } from '@/common/decorators';

export class CreateNewsDto {
  @IsString()
  @Length(1, 255)
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      'slug must be lowercase letters, numbers, and hyphens only (e.g., new-terminal-opening)',
  })
  @Transform(({ value }) => String(value).trim().toLowerCase())
  slug!: string;

  @IsJsonColumn(MultilingualTextDto)
  title!: Record<string, string>;

  @IsOptional()
  @IsJsonColumn(MultilingualTextDto)
  excerpt?: Record<string, string> | null;

  @IsJsonColumn(MultilingualTextDto)
  content!: Record<string, string>;

  @IsEnum(NewsCategory)
  @Transform(({ value }) => String(value).toUpperCase())
  category!: NewsCategory;

  @IsOptional()
  @IsString()
  @Length(0, 255)
  @Transform(({ value }) =>
    value === null || value === undefined ? null : String(value).trim(),
  )
  author?: string | null;

  @IsDateString()
  publishDate!: string;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }): boolean => {
    if (typeof value === 'string') {
      return value === 'true';
    }
    return Boolean(value);
  })
  isFeatured?: boolean;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }): boolean => {
    if (typeof value === 'string') {
      return value === 'true';
    }
    return Boolean(value);
  })
  isPublished?: boolean;

  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      try {
        return JSON.parse(value);
      } catch {
        return [];
      }
    }
    return Array.isArray(value) ? value : [];
  })
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsInt()
  @Min(1)
  @Transform(({ value }) => {
    if (value === null || value === undefined || value === '') return null;
    const n = Number(value);
    return isNaN(n) ? null : n;
  })
  featuredIndex?: number | null;

  @IsOptional()
  @IsJsonColumn(MultilingualTextDto)
  metaDescription?: Record<string, string> | null;
}
