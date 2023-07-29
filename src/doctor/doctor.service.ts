/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
// import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Role } from 'src/contrainst/enum/role-type.enum';

@Injectable()
export class DoctorService {
  constructor(private prisimaService: PrismaService) {}
  async findAll() {
    const allDoctor = await this.prisimaService.user.findMany({
      where: {
        role: Role.DOCTOR,
      },
      include :{
        profile : true,
      }
    });
    return allDoctor;
  }

  async findAllAppointmet(user: any) {
    const appointments = await this.prisimaService.appointment.findMany({
      where: {
        doctorId: user.id,
      },
    });
    return appointments || [];
  }

  async writeRecord(user: any, body: any) {
    const appointment = await this.prisimaService.appointment.findFirst({
      where: {
        AND:[
          {
            id : body.appointmentId
          },
          {
            isFinshed : true
          },
          {
            patientId : body.patientId
          },
          {
            doctorId : user.id
          }
        ]
      },
    })
    if (!appointment) throw new Error('Appointment is not exists');
    body.nextDate = new Date(body.nextDate);
    const newRecord = await this.prisimaService.record.create({
      data: { ...body, doctorId: user.id },
    });
    return newRecord
  }

  findOne(id: number) {
    return `This action returns a #${id} doctor`;
  }

  // update(id: number, updateDoctorDto: UpdateDoctorDto) {
  //   return `This action updates a #${id} doctor`;
  // }

  remove(id: number) {
    return `This action removes a #${id} doctor`;
  }
}
