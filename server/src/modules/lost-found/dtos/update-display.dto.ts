import { MultilingualTextDto } from '@/common/dtos';
import { IsJsonColumn } from '@/common/decorators';

export class UpdateDisplayDto {
  @IsJsonColumn(MultilingualTextDto)
  displayNames?: Record<string, string>;

  @IsJsonColumn(MultilingualTextDto)
  displayDescriptions?: Record<string, string>;

  @IsJsonColumn(MultilingualTextDto)
  displayLocations?: Record<string, string>;
}
