import {
  IsDefined,
  IsEnum,
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
}
