import {
  IsDefined,
  IsEnum,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CounterArea } from '@/types/enum';

export class CreateCounterDto {
  @IsDefined()
  @IsEnum(CounterArea)
  area: CounterArea;

  @IsDefined()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name: string;
}
