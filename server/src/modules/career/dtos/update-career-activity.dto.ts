import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateCareerActivityDto } from './create-career-activity.dto';

export class UpdateCareerActivityDto extends PartialType(
  CreateCareerActivityDto,
) {
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }): boolean => {
    if (typeof value === 'string') return value === 'true';
    return Boolean(value);
  })
  isActive?: boolean;
}
