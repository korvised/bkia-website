import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ForgotPassword } from '@/database';
import { ConfigService } from '@/common/config';
import { MailModule } from '@/common/mail';
import { HrmsModule } from '@/common/hrms';
import { UserModule } from '@/modules/user';
import { RoleModule } from '@/modules/role';
import { JwtStrategy, LocalStrategy } from './strategies';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [NestConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('jwt.secret'),
        signOptions: {
          expiresIn: configService.get('jwt.expiresIn'),
        },
      }),
    }),
    TypeOrmModule.forFeature([ForgotPassword]),
    MailModule,
    HrmsModule,
    RoleModule,
    UserModule,
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
