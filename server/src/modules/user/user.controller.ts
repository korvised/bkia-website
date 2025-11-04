import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Roles } from '@/common/decorators';
import { JwtAuthGuard, RolesGuard } from '@/common/guards';
import { UserRole } from '@/types/enum';
import { plainToInstance } from 'class-transformer';
import { UserService } from './user.service';
import {
  CreateUserDto,
  QueryUserDto,
  UpdateUserDto,
  UserRolesDto,
} from './dtos';
import { validateDtoArrayOrReject } from '@/utils';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(@Query() query: QueryUserDto) {
    return this.userService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') employeeId: string) {
    return this.userService.findOneById(employeeId);
  }

  @Post()
  async create(@Body() userDto: CreateUserDto) {
    return this.userService.create(userDto);
  }

  @Put(':id')
  async update(
    @Param('id') employeeId: string,
    @Body() userDto: UpdateUserDto,
  ) {
    return this.userService.update(employeeId, userDto);
  }

  @Patch('add-roles/:id')
  async addRoles(@Param('id') employeeId: string, @Body() body: any) {
    if (!Array.isArray(body)) {
      throw new BadRequestException('Body must be an array');
    }

    const dtos = await validateDtoArrayOrReject<UserRolesDto>(
      plainToInstance(UserRolesDto, body),
    );

    return this.userService.addUserRoles(
      employeeId,
      dtos.flatMap((item) => item.role),
    );
  }

  @Patch('remove-roles/:id')
  async removeRoles(@Param('id') employeeId: string, @Body() body: any) {
    if (!Array.isArray(body)) {
      throw new BadRequestException('Body must be an array');
    }

    const dtos = await validateDtoArrayOrReject<UserRolesDto>(
      plainToInstance(UserRolesDto, body),
    );

    return this.userService.removeUserRoles(
      employeeId,
      dtos.flatMap((item) => item.role),
    );
  }
}
