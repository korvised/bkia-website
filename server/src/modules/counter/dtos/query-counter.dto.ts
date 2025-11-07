import { IsBooleanString, IsEnum, IsOptional } from 'class-validator';
import { Terminal } from '@/types/enum';

export class QueryCounterDto {
  @IsOptional()
  @IsEnum(Terminal)
  terminal?: Terminal;

  @IsOptional()
  @IsBooleanString()
  isActive?: string;
}
