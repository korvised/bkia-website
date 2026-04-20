import { IsArray, IsUUID } from 'class-validator';

export class ReorderCareerActivitiesDto {
  @IsArray()
  @IsUUID('4', { each: true })
  ids: string[];
}
