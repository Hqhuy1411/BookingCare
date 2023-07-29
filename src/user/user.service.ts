import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Role } from 'src/contrainst/enum/role-type.enum';

@Injectable()
export class UserService {
  constructor(private prisimaService: PrismaService) {}
  async create(dto: any) {
    try {
      const user = await this.prisimaService.user.create({
        data: {
          email: dto.email,
          name: dto.name,
          password: dto.password,
          role: dto.role,
        },
      });
      return user;
    } catch (error) {
      console.log(error);
    }
  }
  async findDoctor(id: number) {
    const doctor = await this.prisimaService.user.findUnique({
      where: {
        id,
      },
    });
    if (!doctor) return; //Not find user
    if (doctor.role === Role.DOCTOR) {
      return doctor;
    } else {
      return; //Not a doctor
    }
  }
  async findOneByEmail(email: string) {
    try {
      const user = await this.prisimaService.user.findUnique({
        where: {
          email,
        },
      });
      return user;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async myRecord(user: any) {
    const myrecords = await this.prisimaService.record.findMany({
      where: {
        patientId: user.id,
      },
      include: {
        appointment: true,
      },
    });
    if (myrecords) return myrecords || [];
  }

  async findOne(id: number) {
    return await this.prisimaService.user.findFirst({
      where: {
        id,
      },
    });
  }

  async update(reqUser: any, updateUserDto: UpdateUserDto) {
    const { name, ...body } = updateUserDto;
    const user = await this.prisimaService.user.update({
      where: {
        id: reqUser.id,
      },
      data: {
        name,
      },
    });
    if (user.role === Role.PATIENT) return user;
    const profile = await this.prisimaService.profile.update({
      where: {
        id: user.id,
      },
      data: {
        ...body,
      },
    });
    return { user, profile };
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
