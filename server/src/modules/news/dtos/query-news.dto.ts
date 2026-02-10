import {
  IsDateString,
  IsEnum,
  IsIn,
  IsOptional,
  IsString,
} from 'class-validator';
import { PaginationDto } from '@/common/dtos';
import { NewsCategory } from '@/types/enum';

export class QueryNewsDto extends PaginationDto {
  /** Free text search – search in title, excerpt, content (all languages) */
  @IsOptional()
  @IsString()
  search?: string;

  /** Filter by category */
  @IsOptional()
  @IsEnum(NewsCategory, { message: 'Invalid category value' })
  category?: NewsCategory;

  /** Filter by publish date (exact match) */
  @IsOptional()
  @IsDateString()
  publishDate?: string;

  /** Filter by published status */
  @IsOptional()
  @IsString()
  @IsIn(['true', 'false'])
  isPublished?: string;

  /** Filter by featured status */
  @IsOptional()
  @IsString()
  @IsIn(['true', 'false'])
  isFeatured?: string;

  /** Field to order by */
  @IsOptional()
  @IsString()
  @IsIn(['publishDate', 'viewCount', 'createdAt'], {
    message: 'sortBy must be one of publishDate, viewCount, or createdAt',
  })
  sortBy?: 'publishDate' | 'viewCount' | 'createdAt';

  /** Sort direction */
  @IsOptional()
  @IsString()
  @IsIn(['ASC', 'DESC'], { message: 'order must be ASC or DESC' })
  order?: 'ASC' | 'DESC';
}
