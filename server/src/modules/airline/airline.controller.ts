import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Query,
  ParseUUIDPipe,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageFileFilter } from '@/common/filters';
import { FILE_SIZES } from '@/constants/file';
import { CreateAirlineDto, QueryAirlineDto, UpdateAirlineDto } from './dtos';
import { AirlineService } from './airline.service';
import { JwtAuthGuard, RolesGuard } from '@/common/guards';
import { Roles } from '@/common/decorators';
import { UserRole } from '@/types/enum';

@Controller('airlines')
export class AirlineController {
  constructor(private readonly service: AirlineService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.PASSENGER)
  @Post()
  @UseInterceptors(
    FileInterceptor('logo', {
      limits: { fileSize: FILE_SIZES.MEDIUM_IMAGE },
      fileFilter: imageFileFilter,
    }),
  )
  create(
    @Body() dto: CreateAirlineDto,
    @UploadedFile() logo?: Express.Multer.File,
  ) {
    return this.service.create(dto, logo);
  }

  @Get()
  findAll(@Query() query: QueryAirlineDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.service.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.PASSENGER)
  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('logo', {
      limits: { fileSize: FILE_SIZES.MEDIUM_IMAGE },
      fileFilter: imageFileFilter,
    }),
  )
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateAirlineDto,
    @UploadedFile() logo?: Express.Multer.File,
  ) {
    return this.service.update(id, dto, logo);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.PASSENGER)
  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.service.remove(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.PASSENGER)
  @Patch(':id/activate')
  activate(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.service.setActive(id, true);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.PASSENGER)
  @Patch(':id/deactivate')
  deactivate(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.service.setActive(id, false);
  }
}
