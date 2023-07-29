import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserService } from 'src/user/user.service';
import { MailModule } from 'src/mailer/mailer.module';
import FcmModule from 'src/fcm/fcm.module';

@Module({
  imports: [FcmModule, PrismaModule, MailModule],
  controllers: [AppointmentController],
  providers: [AppointmentService, UserService],
})
export class AppointmentModule {}
