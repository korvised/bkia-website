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
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageFileFilter } from '@/common/filters';
import { FILE_SIZES } from '@/constants/file';
import { CreateAirlineDto, QueryAirlineDto, UpdateAirlineDto } from './dtos';
import { AirlineService } from './airline.service';

@Controller('airlines')
export class AirlineController {
  constructor(private readonly service: AirlineService) {}

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

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.service.remove(id);
  }

  @Patch(':id/activate')
  activate(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.service.setActive(id, true);
  }

  @Patch(':id/deactivate')
  deactivate(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.service.setActive(id, false);
  }
}
