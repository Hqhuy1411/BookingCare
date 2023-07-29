import { IsDate, IsNumber, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateAppointmentDto {
  @IsNotEmpty()
  @IsDateString()
  date: Date;
  @IsNotEmpty()
  @IsNumber()
  doctorId: number;
  descriptionByPatient?: string;
}
