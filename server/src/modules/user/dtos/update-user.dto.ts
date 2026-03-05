import { IsEnum, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { UserStatus } from '@/types/enum';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsEnum(UserStatus)
  status?: UserStatus;
}
