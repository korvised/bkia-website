import { IsUUID } from 'class-validator';

export class SetCoverDto {
  @IsUUID()
  fileId: string;
}
