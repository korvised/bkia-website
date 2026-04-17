import { IsOptional, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateNewsDto } from './create-news.dto';

export class UpdateNewsDto extends PartialType(CreateNewsDto) {
  /**
   * JSON-encoded array of existing image IDs to keep.
   * e.g. '["uuid1","uuid2"]'
   * When present (even "[]"), the gallery is rebuilt from kept IDs + new uploads.
   * When omitted, the gallery is left untouched.
   */
  @IsOptional()
  @IsString()
  keepImageIds?: string;
}
