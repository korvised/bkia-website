import {
  IsArray,
  IsDefined,
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  @IsString()
  empId?: string;

  @IsDefined()
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  name: string;

  @IsDefined()
  @IsEmail()
  email: string;

  @IsDefined()
  @IsString()
  @MinLength(6)
  phoneNumber: string;

  @IsDefined()
  @IsString()
  @MinLength(4)
  password: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  roles?: string[];
}
