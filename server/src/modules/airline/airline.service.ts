import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Airline } from '@/database';
import { FileService } from '@/common/file';
import { CreateAirlineDto, QueryAirlineDto, UpdateAirlineDto } from './dtos';

@Injectable()
export class AirlineService {
  constructor(
    @InjectRepository(Airline)
    private readonly airlineRepo: Repository<Airline>,
    private readonly fileService: FileService,
  ) {}

  private async ensureCodeUnique(code: string, excludeId?: string) {
    const exists = await this.airlineRepo.findOne({ where: { code } });
    if (exists && exists.id !== excludeId) {
      throw new BadRequestException('Airline code already exists');
    }
  }

  private async attachLogoFromId(airline: Airline, logoFileId: string) {
    const file = await this.fileService.findById(logoFileId);
    if (!file) throw new BadRequestException('logoFileId not found');
    airline.logoFile = file;
    return airline;
  }

  async create(dto: CreateAirlineDto, logo?: Express.Multer.File) {
    const code = dto.code.trim().toUpperCase();
    await this.ensureCodeUnique(code);

    // create airline first to get ID (we want folder airlines/<id>)
    let airline = this.airlineRepo.create({
      code,
      name: dto.name.trim(),
      hotline: dto.hotline?.trim() ?? null,
      phone: dto.phone?.trim() ?? null,
      website: dto.website?.trim() ?? null,
      isActive: dto.isActive ?? true,
    });

    airline = await this.airlineRepo.save(airline);

    // if provided an existing file id, prefer that (no upload)
    if (dto.logoFileId && !logo) {
      await this.attachLogoFromId(airline, dto.logoFileId);
      airline = await this.airlineRepo.save(airline);
      return this.findOne(airline.id);
    }

    // if logo uploaded, send to FileService and attach
    if (logo) {
      const fileEntity = await this.fileService.uploadFile(
        logo,
        `airlines/${airline.id}`,
      );
      airline.logoFile = fileEntity;
      airline = await this.airlineRepo.save(airline);
    }

    return this.findOne(airline.id);
  }

  async findAll(query: QueryAirlineDto) {
    const {
      search,
      isActive,
      orderBy = 'createdAt',
      order = 'DESC',
      page = 1,
      limit = 10,
    } = query;

    const qb = this.airlineRepo
      .createQueryBuilder('a')
      .leftJoinAndSelect('a.logoFile', 'logo')
      .orderBy(`a.${orderBy}`, order)
      .skip((page - 1) * limit)
      .take(limit);

    if (search?.trim()) {
      qb.andWhere('(a.code ILIKE :s OR a.name ILIKE :s)', {
        s: `%${search.trim()}%`,
      });
    }
    if (isActive === 'true') qb.andWhere('a.isActive = true');
    if (isActive === 'false') qb.andWhere('a.isActive = false');

    const [data, total] = await qb.getManyAndCount();
    return {
      data,
      meta: { total, page, limit, pages: Math.ceil(total / limit) },
    };
  }

  async findOne(id: string) {
    const airline = await this.airlineRepo.findOne({
      where: { id },
      relations: { logoFile: true },
    });
    if (!airline) throw new NotFoundException('Airline not found');
    return airline;
  }

  async update(id: string, dto: UpdateAirlineDto, logo?: Express.Multer.File) {
    let airline = await this.findOne(id);

    if (dto.code) {
      const newCode = dto.code.trim().toUpperCase();
      if (newCode !== airline.code) await this.ensureCodeUnique(newCode, id);
      airline.code = newCode;
    }
    if (dto.name !== undefined) airline.name = dto.name.trim();
    if (dto.hotline !== undefined)
      airline.hotline = dto.hotline?.trim() ?? null;
    if (dto.phone !== undefined) airline.phone = dto.phone?.trim() ?? null;
    if (dto.website !== undefined)
      airline.website = dto.website?.trim() ?? null;
    if (dto.isActive !== undefined) airline.isActive = dto.isActive;

    // handle removeLogo flag
    if (dto.removeLogo) {
      if (airline.logoFile?.id) {
        await this.fileService.deleteFile(airline.logoFile.id);
      }
      airline.logoFile = null;
    }

    // If a file uploaded, replace the existing
    if (logo) {
      // If a file was previously uploaded, delete it
      if (airline.logoFile?.id) {
        await this.fileService.deleteFile(airline.logoFile?.id);
      }
      // Upload the new file to the server
      const uploaded = await this.fileService.uploadFile(
        logo,
        `airlines/${airline.id}`,
      );
      airline.logoFile = uploaded;
    }

    airline = await this.airlineRepo.save(airline);
    return this.findOne(airline.id);
  }

  async remove(id: string) {
    const airline = await this.findOne(id);
    airline.isActive = false;
    return this.airlineRepo.save(airline);
  }

  async setActive(id: string, active: boolean) {
    const airline = await this.findOne(id);
    airline.isActive = active;
    return this.airlineRepo.save(airline);
  }
}
