import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Request,
  UseGuards,
  Put,
} from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { JwtStrategyGuard } from 'src/auth/gruad/auth.graud';
@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}
  @UseGuards(JwtStrategyGuard)
  @Post()
  create(
    @Request() req: any,
    @Body() createAppointmentDto: CreateAppointmentDto,
  ) {
    const body: any = createAppointmentDto;
    body.patientId = req.user.id;
    return this.appointmentService.create(body);
  }

  @UseGuards(JwtStrategyGuard)
  @Get()
  async findAll(@Request() req: any) {
    return this.appointmentService.findAll(req.user);
  }
  @UseGuards(JwtStrategyGuard)
  @Put('accept/:id')
  accept(@Param('id') id: string, @Request() req: any) {
    return this.appointmentService.accept(+id, req.user);
  }

  @UseGuards(JwtStrategyGuard)
  @Put('accept/:id')
  reject(@Param('id') id: string, @Request() req: any) {
    return this.appointmentService.reject(+id, req.user);
  }

  @UseGuards(JwtStrategyGuard)
  @Put('cancel/:id')
  cancelByPatient(@Param('id') id: string, @Request() req: any) {
    return this.appointmentService.cancelByPatient(+id, req.user);
  }
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAppointmentDto: UpdateAppointmentDto) {
  //   return this.appointmentService.update(+id, updateAppointmentDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointmentService.remove(+id);
  }
}
