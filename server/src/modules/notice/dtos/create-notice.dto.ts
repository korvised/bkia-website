import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsObject,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ImportantPriority } from '@/types/enum';
import { MultilingualTextDto } from '@/common/dtos';

export class CreateNoticeDto {
  @IsObject()
  @ValidateNested()
  @Type(() => MultilingualTextDto)
  title!: Record<string, string>;

  @IsObject()
  @ValidateNested()
  @Type(() => MultilingualTextDto)
  description!: Record<string, string>;

  @IsObject()
  @ValidateNested()
  @Type(() => MultilingualTextDto)
  content!: Record<string, string>;

  @IsEnum(ImportantPriority)
  priority!: ImportantPriority;

  @IsDateString()
  publishDate!: string;

  @IsOptional()
  @IsDateString()
  effectiveDate?: string | null;

  @IsOptional()
  @IsDateString()
  expiryDate?: string | null;

  @IsOptional()
  @IsObject({ each: true })
  @ValidateNested({ each: true })
  @Type(() => MultilingualTextDto)
  tags?: Record<string, string>[];

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
