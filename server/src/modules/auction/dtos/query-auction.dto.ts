import { IsEnum, IsOptional, IsString, Min } from 'class-validator';
import { Transform } from 'class-transformer';
import { AuctionCategory, AuctionStatus } from '@/types/enum';

export class QueryAuctionDto {
  @IsOptional()
  @IsEnum(AuctionStatus)
  status?: AuctionStatus;

  @IsOptional()
  @IsEnum(AuctionCategory)
  category?: AuctionCategory;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  @Min(1)
  page?: number;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  @Min(1)
  limit?: number;
}
