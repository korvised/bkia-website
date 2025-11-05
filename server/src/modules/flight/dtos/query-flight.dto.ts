import {
  IsDateString,
  IsEnum,
  IsIn,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { PaginationDto } from '@/common/dtos';
import { FlightDirection, FlightStatus, FlightType } from '@/types/enum';

export class QueryFlightDto extends PaginationDto {
  /** Free text search — e.g. flight number, airline name, or route code */
  @IsOptional()
  @IsString()
  search?: string;

  /** Operation date (YYYY-MM-DD) */
  @IsOptional()
  @IsDateString(
    {},
    { message: 'operationDate must be a valid ISO date (YYYY-MM-DD)' },
  )
  operationDate?: string;

  /** Flight direction relative to this airport */
  @IsOptional()
  @IsEnum(FlightDirection, { message: 'Invalid flight direction value' })
  direction?: FlightDirection;

  /** Filter by flight type (scheduled, charter, cargo, etc.) */
  @IsOptional()
  @IsEnum(FlightType, { message: 'Invalid flight type value' })
  type?: FlightType;

  /** Filter by flight status (scheduled, departed, delayed, etc.) */
  @IsOptional()
  @IsEnum(FlightStatus, { message: 'Invalid flight status value' })
  status?: FlightStatus;

  /** Filter by airline */
  @IsOptional()
  @IsUUID('4', { message: 'airlineId must be a valid UUID' })
  airlineId?: string;

  /** Filter by assigned check-in counter */
  @IsOptional()
  @IsUUID('4', { message: 'counterId must be a valid UUID' })
  counterId?: string;

  /** Field to order by */
  @IsOptional()
  @IsString()
  @IsIn(['flightNo', 'operationDate', 'createdAt', 'status'], {
    message:
      'orderBy must be one of flightNo, operationDate, createdAt, or status',
  })
  orderBy?: 'flightNo' | 'operationDate' | 'createdAt' | 'status';

  /** Sort direction */
  @IsOptional()
  @IsString()
  @IsIn(['ASC', 'DESC'], { message: 'order must be ASC or DESC' })
  order?: 'ASC' | 'DESC';
}
