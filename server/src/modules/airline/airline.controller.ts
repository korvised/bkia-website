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
import { JwtAuthGuard, PermissionsGuard, RolesGuard } from '@/common/guards';
import { Permissions, Roles } from '@/common/decorators';
import { UserRole } from '@/types/enum';
import { PERMISSIONS } from '@/constants';

const { AIRLINE } = PERMISSIONS;

@Controller('airlines')
export class AirlineController {
  constructor(private readonly service: AirlineService) {}

  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  @Permissions(AIRLINE.CREATE)
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

  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  @Permissions(AIRLINE.UPDATE)
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

  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  @Permissions(AIRLINE.DELETE)
  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.service.remove(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  @Permissions(AIRLINE.UPDATE)
  @Patch(':id/activate')
  activate(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.service.setActive(id, true);
  }

  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  @Permissions(AIRLINE.UPDATE)
  @Patch(':id/deactivate')
  deactivate(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.service.setActive(id, false);
  }
}
