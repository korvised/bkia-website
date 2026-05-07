import { IsEmail, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateClaimDto {
  @IsString()
  @Length(2, 255)
  claimantName: string;

  @IsOptional()
  @IsEmail()
  @IsNotEmpty()
  claimantEmail?: string;

  @IsOptional()
  @IsString()
  @Length(1, 30)
  claimantPhone?: string;

  @IsOptional()
  @IsString()
  @Length(1, 20)
  flightNumber?: string;

  @IsOptional()
  @IsString()
  @Length(1, 20)
  seatNumber?: string;

  @IsString()
  @Length(10, 2000)
  ownershipProof: string;
}
