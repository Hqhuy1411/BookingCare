import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Request,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateRecordDto } from './dto/create-doctor.dto';
import { JwtStrategyGuard } from 'src/auth/gruad/auth.graud';
// import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Get()
  findAll() {
    return this.doctorService.findAll();
  }
  @UseGuards(JwtStrategyGuard)
  @Get('myappointment')
  @Get()
  findAllAppointmet(@Request() req: any) {
    return this.doctorService.findAllAppointmet(req.user);
  }
  @UseGuards(JwtStrategyGuard)
  @Get('write-record')
  @Post()
  writeRecord(@Request() req: any, @Body() createRecordDto: CreateRecordDto) {
    return this.doctorService.writeRecord(req.user, createRecordDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doctorService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
  //   return this.doctorService.update(+id, updateDoctorDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doctorService.remove(+id);
  }
}
