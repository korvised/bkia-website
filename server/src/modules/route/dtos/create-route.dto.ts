import { IsDefined, IsEnum, IsNumber, IsUUID } from 'class-validator';
import { RouteType } from '@/types/enum';

export class CreateRouteDto {
  @IsDefined()
  @IsEnum(RouteType)
  routeType: RouteType;

  @IsDefined()
  @IsNumber()
  durationMin: number;

  @IsDefined()
  @IsUUID()
  originId: string;

  @IsDefined()
  @IsUUID()
  destinationId: string;
}
