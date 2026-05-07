import { IsEnum } from 'class-validator';
import { LostFoundStatus } from '@/types/enum';

export class UpdateStatusDto {
  @IsEnum(LostFoundStatus)
  status: LostFoundStatus;
}
