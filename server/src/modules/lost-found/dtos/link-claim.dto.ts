import { IsUUID } from 'class-validator';

export class LinkClaimDto {
  @IsUUID()
  lostFoundId: string;
}
