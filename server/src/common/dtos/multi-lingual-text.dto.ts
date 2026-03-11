import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class MultilingualTextDto {
  @IsString()
  @IsNotEmpty()
  en: string;

  @IsString()
  @IsNotEmpty()
  lo: string;

  @IsString()
  @IsNotEmpty()
  zh: string;
}

export class MultilingualFieldDto {
  @IsString()
  @IsNotEmpty()
  en: string;

  @IsString()
  @IsOptional()
  lo?: string;

  @IsString()
  @IsOptional()
  zh?: string;
}

/**
 * All fields optional — used for optional multilingual fields
 * (e.g. banner title) where none of en/lo/zh are required.
 */
export class OptionalMultilingualTextDto {
  @IsString()
  @IsOptional()
  en?: string;

  @IsString()
  @IsOptional()
  lo?: string;

  @IsString()
  @IsOptional()
  zh?: string;
}
