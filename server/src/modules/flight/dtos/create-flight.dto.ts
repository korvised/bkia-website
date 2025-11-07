import { Transform } from 'class-transformer';
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
} from 'class-validator';
import { FlightStatus, FlightType, Terminal } from '@/types/enum';
import { Optional } from '@nestjs/common';

const TIME_HH_MM = /^(?:[01]\d|2[0-3]):[0-5]\d$/; // 24h "HH:mm"

export class CreateFlightDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 20)
  @Transform(({ value }) => String(value).trim().toUpperCase())
  flightNo!: string;

  @IsEnum(FlightType)
  type!: FlightType;

  @IsEnum(Terminal)
  terminal!: Terminal;

  @Optional()
  @IsString()
  @Length(1, 5)
  gate?: string | null;

  @IsDateString() // ISO date "YYYY-MM-DD"
  operationDate!: string;

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

  // Check-in window (departures)
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

  // Enum default mirrors entity default
  @IsOptional()
  @IsEnum(FlightStatus)
  status: FlightStatus = FlightStatus.SCHEDULED;

  @IsOptional()
  @IsString()
  @Length(0, 255)
  @Transform(({ value }) =>
    value === null || value === undefined ? null : String(value).trim(),
  )
  remarks?: string | null;

  // Relations as IDs
  @IsUUID('4', { message: 'routeId must be a valid UUID' })
  routeId!: string;

  @IsUUID('4', { message: 'airlineId must be a valid UUID' })
  airlineId!: string;

  @IsArray()
  @IsUUID('4', { each: true, message: 'Each counterId must be a valid UUID' })
  checkInCounterIds: string[];
}
