import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  Length,
} from 'class-validator';
import { IsLocalizedObject } from '@/common/decorators';
import { stringToJsonObject } from '@/utils/transformers';

export class CreateAirlineDto {
  @IsString()
  @Length(2, 8)
  code: string;

  @IsString()
  @Length(2, 255)
  name: string;

  @IsOptional()
  @Transform(({ value }) => stringToJsonObject(value))
  @IsLocalizedObject(['en', 'lo', 'zh'], { message: 'Invalid names' })
  names?: Record<string, string>;

  // picking an existing File (without uploading)
  @IsOptional()
  @IsUUID()
  logoFileId?: string;

  @IsOptional()
  @IsString()
  hotline?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsUrl({ require_protocol: false })
  website?: string;

  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  isActive?: boolean;
}
