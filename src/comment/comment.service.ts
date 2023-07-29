import { Injectable } from '@nestjs/common';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentService {
  constructor(private prismaService: PrismaService) {}
  async create(user: any, body: any) {
    const record = await this.prismaService.record.findMany({
      where: {
        AND: [
          {
            doctorId: body.toDoctor,
          },
          {
            patientId: user.id,
          },
        ],
      },
    });
    if (!record) throw new Error('You are not able comment');
    return await this.prismaService.comment.create({
      data: {
        ...body,
        byPatient: user.id,
      },
    });
  }

  findAll() {
    return `This action returns all comment`;
  }

  async findOne(id: number) {
    return await this.prismaService.comment.findFirst({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    const commentUpdated = await this.prismaService.comment.update({
      where: {
        id,
      },
      data: {
        ...updateCommentDto,
      },
    });
    return commentUpdated;
  }

  async remove(id: number) {
    await this.prismaService.comment.delete({
      where: {
        id,
      },
    });
    return true;
  }
}
