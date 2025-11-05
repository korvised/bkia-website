import {
  IsDefined,
  IsEnum,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { TerminalZone } from '@/types/enum';

export class CreateCounterDto {
  @IsDefined()
  @IsEnum(TerminalZone)
  zone: TerminalZone;

  @IsDefined()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name: string;
}
