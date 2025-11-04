import { IsDefined, IsString, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @IsDefined()
  @IsString()
  @MinLength(4)
  oldPassword: string;

  @IsDefined()
  @IsString()
  @MinLength(4)
  newPassword: string;
}
