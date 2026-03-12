import { Transform } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsObject,
  IsOptional,
} from 'class-validator';
import { AuctionCategory, AuctionStatus } from '@/types/enum';
import { MultilingualFieldDto } from '@/common/dtos';
import { IsJsonColumn } from '@/common/decorators';

export class CreateAuctionDto {
  @IsJsonColumn(MultilingualFieldDto)
  title!: Record<string, string>;

  @IsJsonColumn(MultilingualFieldDto)
  description!: Record<string, string>;

  @IsEnum(AuctionCategory)
  @Transform(({ value }) => String(value).toUpperCase())
  category!: AuctionCategory;

  @IsDateString()
  startDate!: string;

  @IsDateString()
  endDate!: string;

  @IsOptional()
  @IsEnum(AuctionStatus)
  @Transform(({ value }) => String(value).toUpperCase())
  status?: AuctionStatus;

  /**
   * Multilingual display names, parallel to uploaded documents[] files.
   * Send as JSON string: '[{"en":"Tender Doc","lo":"...","zh":"..."},...]'
   */
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      try {
        return JSON.parse(value) as Record<string, string>[];
      } catch {
        return [];
      }
    }
    return Array.isArray(value) ? value : [];
  })
  @IsArray()
  @IsObject({ each: true })
  documentNames?: Record<string, string>[];
}
