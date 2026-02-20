import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ClaimStatus } from '@/types/enum';

export class ReviewClaimDto {
  @IsEnum([ClaimStatus.APPROVED, ClaimStatus.REJECTED, ClaimStatus.COMPLETED])
  status: ClaimStatus.APPROVED | ClaimStatus.REJECTED | ClaimStatus.COMPLETED;

  @IsOptional()
  @IsString()
  staffNote?: string;
}
