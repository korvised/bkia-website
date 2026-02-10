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
