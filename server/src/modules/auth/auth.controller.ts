import {
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
import { User } from '@/database';
import { JwtAuthGuard, LocalAuthGuard } from '@/common/guards';
import { CurrentUser } from '@/common/decorators';
import { ResetPasswordDto } from '@/common/dtos';
import { Employee } from '@/types/hrms';
import { ChangePasswordDto, ForgotPasswordDto } from './dtos';
import { AuthService } from './auth.service';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('current')
  @UseGuards(JwtAuthGuard)
  async getCurrentUser(@CurrentUser() user: User) {
    let employee: Employee | null = null;
    if (user.empId) {
      employee = await this.authService.getEmployeeById(user.empId);
    }
    return { user, employee };
  }

  @Post('sign-in')
  @UseGuards(LocalAuthGuard)
  signIn(@CurrentUser() user: User) {
    return this.authService.signIn(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('change-password')
  async changePassword(
    @CurrentUser() user: User,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return this.authService.changePassword(user.id, changePasswordDto);
  }

  @Post('/forgot-password')
  async createResetPassword(@Body() body: ForgotPasswordDto) {
    return this.authService.forgotPassword(body);
  }

  @Get('/validate-reset-token')
  async validatePassword(@Query('token') token: string) {
    return this.authService.validateForgotPassword(token);
  }

  @Put('reset-password/:id')
  async resetPassword(@Param('id') id: string, @Body() body: ResetPasswordDto) {
    return this.authService.resetPassword(id, body);
  }
}
