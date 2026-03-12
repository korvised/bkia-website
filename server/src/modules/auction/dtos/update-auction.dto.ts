import { Transform } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsObject,
  IsOptional,
  IsUUID,
} from 'class-validator';
import { AuctionCategory, AuctionStatus } from '@/types/enum';
import { MultilingualFieldDto } from '@/common/dtos';
import { IsJsonColumn } from '@/common/decorators';

export class UpdateAuctionDto {
  @IsOptional()
  @IsJsonColumn(MultilingualFieldDto)
  title?: Record<string, string>;

  @IsOptional()
  @IsJsonColumn(MultilingualFieldDto)
  description?: Record<string, string>;

  @IsOptional()
  @IsEnum(AuctionCategory)
  @Transform(({ value }) => String(value).toUpperCase())
  category?: AuctionCategory;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsEnum(AuctionStatus)
  @Transform(({ value }) => String(value).toUpperCase())
  status?: AuctionStatus;

  /**
   * Multilingual display names for new files appended in this update.
   * Parallel to newDocuments[] files.
   * Send as JSON string: '[{"en":"New Doc 1","lo":"...","zh":"..."},...]'
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
  newDocumentNames?: Record<string, string>[];

  /**
   * IDs of existing AuctionDocument records to delete.
   * Send as JSON string: '["uuid1","uuid2"]'
   */
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      try {
        return JSON.parse(value) as string[];
      } catch {
        return [];
      }
    }
    return Array.isArray(value) ? value : [];
  })
  @IsArray()
  @IsUUID('4', { each: true })
  removeDocumentIds?: string[];
}
