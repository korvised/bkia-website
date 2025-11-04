import * as Bcrypt from 'bcryptjs';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role, User } from '@/database';
import { Repository } from 'typeorm';
import { ResetPasswordDto } from '@/common/dtos';
import { CreateUserDto, QueryUserDto, UpdateUserDto } from './dtos';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async findAll(query: QueryUserDto): Promise<User[]> {
    const queryBuilder = this.repository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'roles');

    if (query.email) {
      queryBuilder.andWhere('user.email LIKE :email', {
        email: `%${query.email.trim()}%`,
      });
    }

    if (query.status) {
      queryBuilder.andWhere('user.status = :status', { status: query.status });
    }

    queryBuilder.orderBy({
      'user.createdAt': 'DESC',
    });

    return queryBuilder.getMany();
  }

  async findOneById(id: string): Promise<User | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['roles'],
    });
  }

  async findOneEmpId(empId: string): Promise<User | null> {
    return this.repository.findOneBy({ empId });
  }

  async findOneEmail(email: string): Promise<User | null> {
    return this.repository.findOneBy({ email });
  }

  async verifyByEmployeeId(
    empId: string,
    password: string,
  ): Promise<User | null> {
    const user = await this.findOneEmpId(empId);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordIsValid = await Bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  async verifyUser(email: string, password: string): Promise<User | null> {
    const user = await this.findOneEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordIsValid = await Bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  async create(dto: CreateUserDto) {
    // Check exit empId
    if (dto.email) {
      const exitingEmpId = await this.repository.findOneBy({
        empId: dto.empId,
      });
      if (exitingEmpId) {
        throw new UnauthorizedException(
          `User with id ${exitingEmpId} already exists`,
        );
      }
    }

    // Check exit email
    const existingUser = await this.repository.findOneBy({
      email: dto.email,
    });
    if (existingUser) {
      throw new BadRequestException(
        `User with email ${dto.email} already exists`,
      );
    }

    // Hash password
    const hashedPassword = await Bcrypt.hash(dto.password, 10);

    const newUser = this.repository.create({
      empId: dto.empId,
      name: dto.name,
      email: dto.email,
      phoneNumber: dto.phoneNumber,
      password: hashedPassword,
    });

    // Check if roles are provided
    if (dto.roles && dto.roles.length) {
      const userRoles: Role[] = [];
      for (const role of dto.roles) {
        const existingRole = await this.roleRepository.findOneBy({
          id: role,
        });
        if (!existingRole) {
          continue;
        }
        userRoles.push(existingRole);
      }

      if (userRoles.length) newUser.roles = userRoles;
    }

    await this.repository.save(newUser);

    return this.findOneById(newUser.id);
  }

  async update(id: string, userDto: UpdateUserDto): Promise<User> {
    const existingUser = await this.findOneById(id);
    if (!existingUser) {
      throw new BadRequestException(`User with id ${id} not found`);
    }

    Object.assign(existingUser, userDto);

    // Check if roles are provided
    if (userDto.roles && userDto.roles.length) {
      const userRoles: Role[] = [];
      for (const role of userDto.roles) {
        const existingRole = await this.roleRepository.findOneBy({
          id: role,
        });
        if (!existingRole) {
          continue;
        }
        userRoles.push(existingRole);
      }

      existingUser.roles = userRoles;
    } else {
      existingUser.roles = [...existingUser.roles];
    }

    return this.repository.save(existingUser);
  }

  async changePassword(id: string, userDto: ResetPasswordDto): Promise<User> {
    const existingUser = await this.findOneById(id);
    if (!existingUser) {
      throw new BadRequestException(`User with id ${id} not found`);
    }

    // Hash new password
    const hashedPassword = await Bcrypt.hash(userDto.newPassword, 10);

    // Update password
    existingUser.password = hashedPassword;

    return this.repository.save(existingUser);
  }

  async addUserRoles(userId: string, roleIds: string[]) {
    const exitedUser = await this.findOneById(userId);
    if (!exitedUser) {
      throw new BadRequestException(`User with id ${userId} not found`);
    }

    for (const roleId of roleIds) {
      // Check if the role already exists for the user
      const existingUserRole = exitedUser.roles.find(
        (item) => item.id === roleId,
      );
      if (existingUserRole) {
        continue;
      }

      // Check if the role exists in the database
      const existingRole = await this.roleRepository.findOneBy({
        id: roleId,
      });
      if (!existingRole) {
        continue;
      }

      // Add the role to the user
      exitedUser.roles.push(existingRole);
    }

    await this.repository.save(exitedUser);

    return this.findOneById(userId);
  }

  async removeUserRoles(userId: string, roleIds: string[]) {
    const exitedUser = await this.findOneById(userId);
    if (!exitedUser) {
      throw new BadRequestException(`User with id ${userId} not found`);
    }

    // Filter out the roles to be removed
    exitedUser.roles = exitedUser.roles.filter(
      (item) => !roleIds.includes(item.id),
    );

    await this.repository.save(exitedUser);

    return this.findOneById(userId);
  }
}
