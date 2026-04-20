import { Transform } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';
import { OptionalMultilingualTextDto } from '@/common/dtos';
import { IsJsonColumn } from '@/common/decorators';

export class CreateCareerActivityDto {
  @IsOptional()
  @IsJsonColumn(OptionalMultilingualTextDto)
  caption?: Record<string, string> | null;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Transform(({ value }) =>
    value === null || value === undefined ? 0 : Number(value),
  )
  sortOrder?: number;
}
