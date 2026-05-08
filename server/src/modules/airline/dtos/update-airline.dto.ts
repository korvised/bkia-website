import { PartialType } from '@nestjs/mapped-types';
import { CreateAirlineDto } from './create-airline.dto';
import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateAirlineDto extends PartialType(CreateAirlineDto) {
  // Override isActive with explicit @Transform — PartialType may fail to
  // inherit transform metadata, causing enableImplicitConversion to convert
  // the string "false" to true (Boolean("false") === true).
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  isActive?: boolean;

  // allow removing current logo without replacement
  @IsOptional()
  @Transform(({ value }) => (value === 'true' || value === true))
  @IsBoolean()
  removeLogo?: boolean;
}
