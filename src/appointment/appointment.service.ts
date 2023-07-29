import { Injectable, NotFoundException } from '@nestjs/common';
import FcmService from 'src/fcm/fcm.service';
import { MailService } from 'src/mailer/mailer.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AppointmentService {
  constructor(
    private prismaService: PrismaService,
    private userService: UserService,
    private mailerService: MailService,
    private fcmService: FcmService,
  ) {}
  async create(body: any) {
    body.date = new Date(body.date);
    const doctor = await this.userService.findDoctor(body.doctorId);
    if (!doctor) return;
    const deviceId = ''; // for deviceId of Doctor
    const payload = {};
    await this.fcmService.sendToDevice(deviceId, payload);
    const appointment = await this.prismaService.appointment.create({
      data: { ...body },
    });
    return appointment;
  }

  async findAll(user: any) {
    console.log(user.id);
    const appointments = await this.prismaService.appointment.findMany({
      where: {
        OR: [
          {
            patientId: user.id,
          },
          {
            doctorId: user.id,
          },
        ],
      },
    });
    return appointments || [];
  }

  async accept(id: number, user: any) {
    const appointments = await this.prismaService.appointment.findFirst({
      where: {
        AND: [
          {
            id: id,
          },
          {
            doctorId: user.id,
          },
        ],
      },
      include: {
        patient: true,
      },
    });
    if (!appointments) throw new NotFoundException();
    await this.mailerService.sendEmailConfirmation({
      email: appointments.patient.email,
      name: appointments.patient.name,
    });
    await this.prismaService.appointment.update({
      where: {
        id: appointments.id,
      },
      data: {
        isFinshed: true,
      },
    });
    return 'Accpet schedule';
  }

  async reject(id: number, user: any) {
    const appointments = await this.prismaService.appointment.findFirst({
      where: {
        AND: [
          {
            id: id,
          },
          {
            doctorId: user.id,
          },
        ],
      },
      include: {
        patient: true,
      },
    });
    if (!appointments) throw new NotFoundException();
    await this.mailerService.sendEmailReject({
      email: appointments.patient.email,
      name: appointments.patient.name,
    });
    await this.prismaService.appointment.update({
      where: {
        id: appointments.id,
      },
      data: {
        isCancel: true,
      },
    });
    return 'Reject schedule';
  }

  async cancelByPatient(id: number, user: any) {
    const appointment = await this.prismaService.appointment.findFirst({
      where: {
        AND: [
          {
            id,
          },
          {
            patient: user.id,
          },
          {
            isCancel: false,
          },
          {
            isFinshed: false,
          },
        ],
      },
    });
    if (!appointment) throw new Error('không thể cancel');
    const currentDate = new Date();
    if (currentDate.getDate() - appointment.date.getDate() >= 3600000 * 6) {
      throw new Error('Quá giờ để cancel');
    } else {
      const deviceId = ''; // for deviceId of Doctor
      const payload = {};
      await this.fcmService.sendToDevice(deviceId, payload);
      return await this.prismaService.appointment.update({
        where: {
          id,
        },
        data: {
          isCancelByPatient: true,
        },
      });
    }
  }

  async nofityShedule() {
    const currentDate = new Date();
    const twoHourAgo = new Date(currentDate.getDate() - 2 * 60 * 60 * 1000);
    const twoHalfHourAgo = new Date(currentDate.getDate() - 2 * 60 * 60 * 1000);
    const appointments = await this.prismaService.appointment.findMany({
      where: {
        AND: [
          {
            isFinshed: false,
          },
          {
            date: {
              gte: twoHourAgo.toISOString(),
              lte: twoHalfHourAgo.toISOString(),
            },
          },
        ],
      },
    });
    for (const appointment of appointments) {
      const message = {
        payload: {},
        tokens: ['', ''], //appointment.map((e)=> e.fcmToken)
      };
      this.fcmService.sendMulticast(message);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} appointment`;
  }
}
