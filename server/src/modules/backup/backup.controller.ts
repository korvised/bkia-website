import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Response } from 'express';
import * as fs from 'fs';
import { Roles } from '@/common/decorators';
import { JwtAuthGuard, RolesGuard } from '@/common/guards';
import { UserRole } from '@/types/enum';
import { BackupService } from './backup.service';

@Controller('backup')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.SUPER_ADMIN)
export class BackupController {
  constructor(private readonly service: BackupService) {}

  /**
   * GET /backup
   * List all backup files.
   */
  @Get()
  list() {
    return this.service.list();
  }

  /**
   * POST /backup
   * Create a new pg_dump backup.
   */
  @Post()
  create() {
    return this.service.create();
  }

  /**
   * GET /backup/:fileName/download
   * Stream a backup file to the client.
   * Must come before @Get(':fileName') to avoid route conflict.
   */
  @Get(':fileName/download')
  async download(@Param('fileName') fileName: string, @Res() res: Response) {
    const filePath = this.service.resolve(fileName);
    const stat = fs.statSync(filePath);

    // Use RFC 5987 encoding so filenames with spaces/special chars don't break the header
    const encodedName = encodeURIComponent(fileName);
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${encodedName}"; filename*=UTF-8''${encodedName}`,
    );
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Length', stat.size);

    const stream = fs.createReadStream(filePath);

    // Bug fix: unhandled stream errors crash the process; destroy response on error
    stream.on('error', (err) => {
      if (!res.headersSent) {
        res.status(500).json({ message: 'File read error during download' });
      } else {
        res.destroy();
      }
    });

    stream.pipe(res);
  }

  /**
   * DELETE /backup/:fileName
   * Delete a backup file.
   */
  @Delete(':fileName')
  async delete(@Param('fileName') fileName: string) {
    await this.service.delete(fileName);
    return { message: `Backup ${fileName} deleted` };
  }

  /**
   * POST /backup/restore/upload
   * Restore from an uploaded .sql file.
   */
  @Post('restore/upload')
  @UseInterceptors(FileInterceptor('file'))
  async restoreFromUpload(@UploadedFile() file: Express.Multer.File) {
    // Bug fix: file is undefined when no file is included in the request
    if (!file || !file.buffer) {
      throw new BadRequestException('No SQL file uploaded');
    }
    await this.service.restoreFromBuffer(file.buffer);
    return { message: 'Restore completed successfully' };
  }

  /**
   * POST /backup/restore/:fileName
   * Restore from an existing backup file on disk.
   */
  @Post('restore/:fileName')
  async restoreFromExisting(@Param('fileName') fileName: string) {
    await this.service.restoreFromExisting(fileName);
    return { message: `Restore from ${fileName} completed successfully` };
  }
}
