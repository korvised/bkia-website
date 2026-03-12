import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { FeedbackCategory, Terminal } from '@/types/enum';

export class CreateFeedbackDto {
  @IsOptional()
  @Transform(({ value }) => (value !== undefined ? Number(value) : undefined))
  @IsInt()
  @Min(1)
  @Max(5)
  rating?: number;

  @IsEnum(FeedbackCategory)
  category: FeedbackCategory;

  @IsOptional()
  @IsString()
  comment?: string;

  @IsOptional()
  @IsEnum(Terminal)
  terminal?: Terminal;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  specificArea?: string;

  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  followUp?: boolean;

  @IsOptional()
  @IsEmail()
  @MaxLength(150)
  email?: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  phone?: string;
}
