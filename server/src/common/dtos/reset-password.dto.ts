import { IsDefined, IsString, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @IsDefined()
  @IsString()
  @MinLength(4)
  newPassword: string;
}
