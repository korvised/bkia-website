import { IsBooleanString, IsEnum, IsOptional } from 'class-validator';
import { RouteType } from '@/types/enum';

export class QueryRouteDto {
  @IsOptional()
  @IsEnum(RouteType)
  routeType?: RouteType;

  @IsOptional()
  @IsBooleanString()
  isActive?: string;
}
