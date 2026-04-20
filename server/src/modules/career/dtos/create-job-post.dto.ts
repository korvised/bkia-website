import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsOptional,
  Min,
} from 'class-validator';
import { MultilingualTextDto } from '@/common/dtos';
import { IsJsonColumn } from '@/common/decorators';

export class CreateJobPostDto {
  @IsJsonColumn(MultilingualTextDto)
  title!: Record<string, string>;

  @IsJsonColumn(MultilingualTextDto)
  content!: Record<string, string>;

  @IsJsonColumn(MultilingualTextDto)
  position!: Record<string, string>;

  @IsInt()
  @Min(1)
  @Transform(({ value }) => Number(value))
  vacancyCount!: number;

  @Type(() => String)
  @IsBoolean()
  @Transform(({ value }): boolean => {
    if (typeof value === 'string') return value === 'true';
    return Boolean(value);
  })
  isPublished!: boolean;

  @Type(() => String)
  @IsBoolean()
  @Transform(({ value }): boolean => {
    if (typeof value === 'string') return value === 'true';
    return Boolean(value);
  })
  isFeatured!: boolean;

  @IsDateString()
  publishDate!: string;

  @IsOptional()
  @IsDateString()
  @Transform(({ value }) =>
    value === null || value === '' || value === undefined ? null : String(value),
  )
  deadline?: string | null;
}
