import { IsEmail, IsOptional, IsString, IsUUID, Length } from 'class-validator';

export class CreateClaimDto {
  @IsString()
  @Length(2, 255)
  claimantName: string;

  @IsEmail()
  claimantEmail: string;

  @IsOptional()
  @IsString()
  @Length(0, 30)
  claimantPhone?: string;

  @IsString()
  @Length(10, 2000)
  ownershipProof: string;
}
