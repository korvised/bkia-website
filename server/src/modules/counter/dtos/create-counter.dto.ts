import {
  IsBoolean,
  IsDefined,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Terminal } from '@/types/enum';

export class CreateCounterDto {
  @IsDefined()
  @IsEnum(Terminal)
  terminal: Terminal;

  @IsDefined()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
