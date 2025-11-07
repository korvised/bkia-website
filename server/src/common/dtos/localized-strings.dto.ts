import { IsOptional, IsString, Length } from 'class-validator';

export class LocalizedStringsDto {
  @IsOptional() @IsString() @Length(1, 255) en?: string;
  @IsOptional() @IsString() @Length(1, 255) lo?: string;
  @IsOptional() @IsString() @Length(1, 255) zh?: string;
}
