import { IsDefined, IsString, MinLength } from 'class-validator';

export class UserRolesDto {
  @IsDefined()
  @IsString()
  @MinLength(1)
  role: string;
}
