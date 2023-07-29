/* eslint-disable prettier/prettier */
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
  ) {}
  async sendEmailConfirmation(
    user: { email: string; name: string },
  ) {
    const context = {
      name: user.name,
    };
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Hello',
      template: 'confirmation',
      context,
    });
  }
  async sendEmailReject(
    user: { email: string; name: string },
  ) {
    const context = {
      name: user.name,
    };
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Hello',
      template: 'reject',
      context,
    });
  }
}
