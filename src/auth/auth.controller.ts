import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Request,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto, LoginDTO, RegisterDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateAuthDoctorDto } from './dto/create-doctor';
import { Role } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategyGuard } from './gruad/auth.graud';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up/patient')
  createPatient(@Body() createAuthDto: RegisterDto) {
    const body: any = createAuthDto;
    body.role = Role.PATIENT;
    return this.authService.create(body);
  }

  @Post('sign-up/doctor')
  createDoctor(@Body() CreateAuthDoctorDto: CreateAuthDoctorDto) {
    const body: any = CreateAuthDoctorDto;
    body.role = Role.DOCTOR;
    return this.authService.create(body);
  }

  @Post('sign-in')
  async login(@Body() body: LoginDTO) {
    return await this.authService.signIn(body.email, body.password);
  }

  @UseGuards(JwtStrategyGuard)
  @Get('verify')
  async verify(@Request() req: any) {
    return await this.authService.verify(req.user.email);
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
