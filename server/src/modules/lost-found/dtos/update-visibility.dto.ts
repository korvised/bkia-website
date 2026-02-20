import { IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { LostFoundVisibility } from '@/types/enum';

export class UpdateVisibilityDto {
  @IsEnum(LostFoundVisibility)
  visibility: LostFoundVisibility;

  @IsOptional()
  @IsString()
  @Length(0, 255)
  hideReason?: string;
}
