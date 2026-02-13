import { Module } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@/common/config';
import { MailService } from './mail.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [NestConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get('smtp.host'),
          port: configService.get('smtp.port'),
          secure: configService.get('smtp.secure'),
          auth: {
            user: configService.get('smtp.user'),
            pass: configService.get('smtp.pass'),
          },
          tls: {
            rejectUnauthorized: false,
          },
        },
        defaults: {
          from: configService.get('smtp.user'),
        },
      }),
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
