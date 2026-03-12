import { IsBooleanString, IsEnum, IsOptional, IsString } from 'class-validator';
import { Terminal } from '@/types/enum';

export class QueryCounterDto {
  @IsOptional()
  @IsEnum(Terminal)
  terminal?: Terminal;

  @IsOptional()
  @IsBooleanString()
  isActive?: string;

  @IsOptional()
  @IsString()
  search?: string;
}
