import { IsBooleanString, IsEnum, IsOptional } from 'class-validator';
import { CounterArea } from '@/types/enum';

export class QueryCounterDto {
  @IsOptional()
  @IsEnum(CounterArea)
  area?: CounterArea;

  @IsOptional()
  @IsBooleanString()
  isActive?: string;
}
