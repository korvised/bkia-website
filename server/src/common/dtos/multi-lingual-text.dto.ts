import { IsNotEmpty } from 'class-validator';

export class MultilingualTextDto {
  @IsNotEmpty()
  en: string;

  @IsNotEmpty()
  lo: string;

  @IsNotEmpty()
  zh: string;
}
