import * as Bcrypt from 'bcryptjs';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ForgotPassword } from '@/database';
import { ConfigService } from '@/common/config';
import { UserService } from '@/modules/user';
import { MailService } from '@/common/mail';
import { HrmsService } from '@/common/hrms';
import { ResetPasswordDto } from '@/common/dtos';
import { AccessTokenPayload } from '@/types/auth';
import { IMailPayload } from '@/types/mail';
import { ChangePasswordDto, ForgotPasswordDto } from './dtos';
import { createResetPasswordEmailContent } from './mail-template';
import { Employee } from '@/types/hrms';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(ForgotPassword)
    private readonly forgotPasswordRepository: Repository<ForgotPassword>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly hrmsService: HrmsService,
    private readonly mailService: MailService,
    private readonly userService: UserService,
  ) {}

  getEmployeeById(empId: string) {
    return this.hrmsService.getEmployeeById(empId);
  }

  async signIn(userId: string) {
    // Generate JWT token
    const accessTokenPayload: AccessTokenPayload = { userId };

    const accessToken = this.jwtService.sign(accessTokenPayload, {
      expiresIn: this.configService.get('jwt.expiresIn'),
    });

    const user = await this.userService.findOneById(userId);

    let employee: Employee | null = null;
    if (user?.empId) {
      employee = await this.getEmployeeById(user.empId);
    }

    return { accessToken, user, employee };
  }

  async changePassword(id: string, userDto: ChangePasswordDto) {
    const existingUser = await this.userService.findOneById(id);
    if (!existingUser) {
      throw new BadRequestException(`User with id ${id} not found`);
    }

    // Check if the old password is correct
    const isMatch = await Bcrypt.compare(
      userDto.oldPassword,
      existingUser.password,
    );
    if (!isMatch) {
      throw new BadRequestException('Old password is incorrect');
    }

    return this.userService.changePassword(id, {
      newPassword: userDto.newPassword,
    });
  }

  private async findOneForgotPassword(id: string) {
    return this.forgotPasswordRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  async forgotPassword(body: ForgotPasswordDto) {
    const user = await this.userService.findOneEmail(body.email);
    if (!user) {
      throw new BadRequestException('Invalid email');
    }

    const now = new Date();
    const expiredAt = new Date(now.getTime() + 15 * 60 * 1000); // +15 minutes

    const newResetPassword = this.forgotPasswordRepository.create({
      email: body.email,
      expiresAt: expiredAt,
      user,
    });

    await this.forgotPasswordRepository.save(newResetPassword);

    // Send email with reset password link
    // const logoUrl = this.configService.get('client.url') + '/logo.svg';
    const logoUrl = 'https://admin.bkia.net/images/BOKEO%20LOGO.png';
    const link = `${this.configService.get('igt.clientUrl')}/reset-password?token=${newResetPassword.id}`;
    const mailContent = createResetPasswordEmailContent(logoUrl, link);

    const mailPayload: IMailPayload = {
      to: body.email,
      subject: 'Reset your password',
      html: mailContent,
    };

    await this.mailService.sendEmail(mailPayload);

    return { message: 'Check your email to reset your password' };
  }

  async validateForgotPassword(token: string) {
    const resetPassword = await this.findOneForgotPassword(token);
    if (!resetPassword) {
      throw new BadRequestException('Invalid reset password id');
    }

    if (resetPassword.isUsed) {
      throw new BadRequestException('Reset password already used');
    }

    const now = new Date();
    const expiresAt = new Date(resetPassword.expiresAt);
    if (now.getTime() > expiresAt.getTime()) {
      throw new BadRequestException('Reset password link expired');
    }

    return { message: 'Verify successfully!' };
  }

  async resetPassword(id: string, resetPasswordDto: ResetPasswordDto) {
    const resetPassword = await this.findOneForgotPassword(id);
    if (!resetPassword) {
      throw new BadRequestException('Invalid reset password id');
    }

    if (resetPassword.isUsed) {
      throw new BadRequestException('Reset password already used');
    }

    const now = new Date();
    const expiresAt = new Date(resetPassword.expiresAt);
    if (now.getTime() > expiresAt.getTime()) {
      throw new BadRequestException('Reset password link expired');
    }

    // Change password
    await this.userService.changePassword(
      resetPassword?.user?.id as string,
      resetPasswordDto,
    );

    // Update reset password status
    resetPassword.isUsed = true;
    await this.forgotPasswordRepository.save(resetPassword);

    return { message: 'Reset password successfully' };
  }
}
