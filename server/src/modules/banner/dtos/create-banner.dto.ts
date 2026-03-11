import { Transform } from 'class-transformer';
import { IsBoolean, IsInt, IsOptional, Min } from 'class-validator';
import { MultilingualFieldDto, OptionalMultilingualTextDto } from '@/common/dtos';
import { IsJsonColumn } from '@/common/decorators';

export class CreateBannerDto {
  @IsJsonColumn(MultilingualFieldDto)
  altText!: Record<string, string>;

  @IsOptional()
  @IsJsonColumn(OptionalMultilingualTextDto)
  title?: Record<string, string> | null;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Transform(({ value }) =>
    value !== undefined && value !== null ? Number(value) : 0,
  )
  order?: number;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }): boolean => {
    if (typeof value === 'string') return value === 'true';
    return Boolean(value);
  })
  isActive?: boolean;
}
