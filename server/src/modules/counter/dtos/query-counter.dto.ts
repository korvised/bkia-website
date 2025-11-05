import { IsBooleanString, IsEnum, IsOptional } from 'class-validator';
import { TerminalZone } from '@/types/enum';

export class QueryCounterDto {
  @IsOptional()
  @IsEnum(TerminalZone)
  zone?: TerminalZone;

  @IsOptional()
  @IsBooleanString()
  isActive?: string;
}
