import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { LostFoundCategory, LostFoundType } from '@/types/enum';

export class CreateLostFoundDto {
  @IsEnum(LostFoundType)
  type: LostFoundType;

  @IsEnum(LostFoundCategory)
  category: LostFoundCategory;

  @IsString()
  @Length(2, 255)
  itemName: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  @Length(0, 255)
  location?: string;

  @IsDateString()
  incidentDate: string;

  @IsOptional()
  @IsString()
  @Length(2, 20)
  flightNumber?: string;

  @IsString()
  @Length(2, 255)
  reporterName: string;

  @IsEmail()
  reporterEmail: string;

  @IsOptional()
  @IsString()
  @Length(0, 30)
  reporterPhone?: string;
}
