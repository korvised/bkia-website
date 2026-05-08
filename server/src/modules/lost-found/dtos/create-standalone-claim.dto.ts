import { IsDateString, IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { LostFoundCategory } from '@/types/enum';
import { CreateClaimDto } from './create-claim.dto';

export class CreateStandaloneClaimDto extends CreateClaimDto {
  @IsEnum(LostFoundCategory)
  category: LostFoundCategory;

  @IsString()
  @Length(5, 2000)
  itemDescription: string;

  @IsOptional()
  @IsString()
  @Length(1, 255)
  lostLocation?: string;

  @IsOptional()
  @IsDateString()
  lostDate?: string;
}
