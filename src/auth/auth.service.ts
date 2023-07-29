/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { compare } from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { PasswordService } from './password.service';
import { Role } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private passwordService: PasswordService,
    private jwtService: JwtService,
    private prisimaService: PrismaService,
  ) {}
  async create(body: any) {
    try {
      const user = await this.userService.findOneByEmail(body.email);
      if (!user) {
        const hashPassword = await this.passwordService.hashPassword(
          body.password,
        );
        body.password = hashPassword;
        const newUser = await this.userService.create(body)!;
        if (newUser) {
          if (newUser.role === Role.DOCTOR) {
            const profile = await this.prisimaService.profile.create({
              data: {
                address: body.address,
                degree: body.degree,
                major: body.major,
                userEmail: newUser.email,
              },
            });
            return { newUser, profile };
          }
          return newUser;
        }
      } else {
        throw new UnauthorizedException('Email already exists');
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async signIn(email: string, pass: string) {
    const user = await this.userService.findOneByEmail(email);
    if (!user) throw new NotFoundException();
    if (user && (await compare(pass, user.password))) {
      const payload = { id: user.id, email: user.email };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }
    throw new UnauthorizedException();
  }

  async verify(email: string) {
    return await this.userService.findOneByEmail(email);
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
