import { IsDefined, IsEnum, IsUUID } from 'class-validator';
import { RouteType } from '@/types/enum';

export class CreateRouteDto {
  @IsDefined()
  @IsEnum(RouteType)
  routeType: RouteType;

  @IsDefined()
  @IsUUID()
  origin: string;

  @IsDefined()
  @IsUUID()
  destination: string;
}
