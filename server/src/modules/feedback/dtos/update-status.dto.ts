import { IsEnum } from 'class-validator';
import { FeedbackStatus } from '@/types/enum';

export class UpdateStatusDto {
  @IsEnum(FeedbackStatus)
  status: FeedbackStatus;
}
