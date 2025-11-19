import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Matches,
  ValidateNested,
  ArrayMinSize,
} from 'class-validator';
import { FlightStatus, FlightType, Terminal } from '@/types/enum';

const TIME_HH_MM = /^(?:[01]\d|2[0-3]):[0-5]\d$/; // 24h "HH:mm"

// Base class with common flight properties
export class BaseFlightDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 20)
  @Transform(({ value }) => String(value).trim().toUpperCase())
  flightNo!: string;

  @IsEnum(FlightType)
  type!: FlightType;

  @IsEnum(Terminal)
  terminal!: Terminal;

  @IsOptional()
  @IsString()
  @Length(1, 5)
  gate?: string | null;

  @IsString()
  @Matches(TIME_HH_MM, {
    message: 'scheduledDepTime must be in HH:mm (24h) format',
  })
  scheduledDepTime!: string;

  @IsString()
  @Matches(TIME_HH_MM, {
    message: 'scheduledArrTime must be in HH:mm (24h) format',
  })
  scheduledArrTime!: string;

  @IsOptional()
  @IsString()
  @Matches(TIME_HH_MM, {
    message: 'actualDepTime must be in HH:mm (24h) format',
  })
  actualDepTime?: string | null;

  @IsOptional()
  @IsString()
  @Matches(TIME_HH_MM, {
    message: 'actualArrTime must be in HH:mm (24h) format',
  })
  actualArrTime?: string | null;

  @IsOptional()
  @IsString()
  @Matches(TIME_HH_MM, {
    message: 'checkInStartTime must be in HH:mm (24h) format',
  })
  checkInStartTime?: string | null;

  @IsOptional()
  @IsString()
  @Matches(TIME_HH_MM, {
    message: 'checkInEndTime must be in HH:mm (24h) format',
  })
  checkInEndTime?: string | null;

  @IsOptional()
  @IsEnum(FlightStatus)
  status?: FlightStatus = FlightStatus.SCHEDULED;

  @IsOptional()
  @IsString()
  @Length(0, 255)
  @Transform(({ value }) =>
    value === null || value === undefined ? null : String(value).trim(),
  )
  remarks?: string | null;

  @IsUUID('4', { message: 'routeId must be a valid UUID' })
  routeId!: string;

  @IsUUID('4', { message: 'airlineId must be a valid UUID' })
  airlineId!: string;

  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true, message: 'Each counterId must be a valid UUID' })
  checkInCounterIds?: string[];
}

// Single flight - extends base with single date
export class CreateFlightDto extends BaseFlightDto {
  @IsDateString()
  operationDate!: string;
}

// Bulk create - extends base with multiple dates
export class BulkCreateFlightDto extends BaseFlightDto {
  @IsArray()
  @ArrayMinSize(1, { message: 'At least one operation date is required' })
  @IsDateString({}, { each: true })
  operationDates!: string[];
}
