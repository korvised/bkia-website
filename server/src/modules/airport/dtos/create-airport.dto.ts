import { IsString, Length } from 'class-validator';

export class CreateAirportDto {
  @IsString()
  @Length(2, 10)
  code: string;

  @IsString()
  @Length(2, 255)
  name: string;
}
