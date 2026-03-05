import { IsDefined, IsString, MinLength } from 'class-validator';

export class UserPermissionsDto {
  @IsDefined()
  @IsString()
  @MinLength(1)
  permission: string; // permission ID
}
