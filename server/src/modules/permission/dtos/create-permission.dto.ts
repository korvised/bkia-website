import { IsDefined, IsOptional, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreatePermissionDto {
  @IsDefined()
  @IsString()
  @MinLength(2)
  name: string;

  @IsDefined()
  @IsString()
  @Transform(({ value }) =>
    (value as string).toLowerCase().trim().replace(/\s+/g, ':'),
  )
  slug: string;

  @IsOptional()
  @IsString()
  description?: string;
}
