import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { IMailPayload } from '@/types/mail';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(payload: IMailPayload) {
    try {
      const sendMailParams: ISendMailOptions = {
        ...payload,
      };
      await this.mailerService.sendMail(sendMailParams);
      this.logger.log('Email sent successfully');
    } catch (error) {
      this.logger.error(error);
    }
  }
}
