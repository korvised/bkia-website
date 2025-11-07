import { IsOptional, IsString, Length } from 'class-validator';
import { Transform } from 'class-transformer';
import { IsLocalizedObject } from '@/common/decorators';
import { stringToJsonObject } from '@/utils/transformers';

export class CreateAirportDto {
  @IsString()
  @Length(2, 10)
  code: string;

  @IsString()
  @Length(2, 255)
  name: string;

  @IsOptional()
  @Transform(({ value }) => stringToJsonObject(value))
  @IsLocalizedObject(['en', 'lo', 'zh'], { message: 'Invalid names' })
  names?: Record<string, string>;
}
