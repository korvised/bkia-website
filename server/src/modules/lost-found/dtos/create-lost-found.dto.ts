import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { MultilingualTextDto } from '@/common/dtos';
import { IsJsonColumn } from '@/common/decorators';
import { LostFoundCategory } from '@/types/enum';

export class CreateLostFoundDto {
  @IsEnum(LostFoundCategory)
  category: LostFoundCategory;

  @IsOptional()
  @IsJsonColumn(MultilingualTextDto)
  displayNames?: Record<string, string>;

  @IsOptional()
  @IsJsonColumn(MultilingualTextDto)
  displayDescriptions?: Record<string, string>;

  @IsOptional()
  @IsJsonColumn(MultilingualTextDto)
  displayLocations?: Record<string, string>;

  @IsDateString()
  incidentDate: string;

  @IsOptional()
  @IsString()
  @Length(2, 20)
  flightNumber?: string;

  @IsString()
  @Length(2, 255)
  reporterName: string;

  @IsOptional()
  @IsEmail()
  reporterEmail?: string;

  @IsString()
  @Length(2, 30)
  reporterPhone: string;
}
