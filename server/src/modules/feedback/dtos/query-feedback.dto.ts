import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { FeedbackCategory, FeedbackStatus } from '@/types/enum';

export class QueryFeedbackDto {
  @IsOptional()
  @IsEnum(FeedbackStatus)
  status?: FeedbackStatus;

  @IsOptional()
  @IsEnum(FeedbackCategory)
  category?: FeedbackCategory;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 20;
}
