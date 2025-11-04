import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@/config';
import { IMailPayload } from '@/common/types';
import { MailService } from './mail.service';

describe('MailService', () => {
  let service: MailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
                pass: configService.get('smtp.pass')
              },
              tls: {
                rejectUnauthorized: false
              }
            },
            defaults: {
              from: configService.get('smtp.user')
            }
          })
        }),
        ConfigModule
      ],
      providers: [MailService]
    }).compile();

    service = module.get<MailService>(MailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should send email', async () => {
    const payload: IMailPayload = {
      to: 'korvised@bokeointernationalairport.com',
      subject: 'Welcome to the realm of NestJS',
      html: '<b>This is a test email from NestJS</b>'
    };

    console.log(payload);

    await service.sendEmail(payload);
  });
});
