import {
  IsDateString,
  IsEnum,
  IsIn,
  IsOptional,
  IsString,
} from 'class-validator';
import { PaginationDto } from '@/common/dtos';
import { ImportantPriority } from '@/types/enum';

export class QueryNoticeDto extends PaginationDto {
  /** Free text search – search in title, description, content (all languages) */
  @IsOptional()
  @IsString()
  search?: string;

  /** Filter by priority */
  @IsOptional()
  @IsEnum(ImportantPriority, { message: 'Invalid priority value' })
  priority?: ImportantPriority;

  /** Filter by publish date (exact match) */
  @IsOptional()
  @IsDateString()
  publishDate?: string;

  /** Filter notices effective on or after this date */
  @IsOptional()
  @IsDateString()
  effectiveFrom?: string;

  /** Filter notices effective on or before this date */
  @IsOptional()
  @IsDateString()
  effectiveTo?: string;

  /** Filter by active status */
  @IsOptional()
  @IsString()
  @IsIn(['true', 'false'])
  isActive?: string;

  /** Field to order by */
  @IsOptional()
  @IsString()
  @IsIn(['publishDate', 'effectiveDate', 'priority', 'createdAt'], {
    message:
      'sortBy must be one of publishDate, effectiveDate, priority, or createdAt',
  })
  sortBy?: 'publishDate' | 'effectiveDate' | 'priority' | 'createdAt';

  /** Sort direction */
  @IsOptional()
  @IsString()
  @IsIn(['ASC', 'DESC'], { message: 'order must be ASC or DESC' })
  order?: 'ASC' | 'DESC';
}
