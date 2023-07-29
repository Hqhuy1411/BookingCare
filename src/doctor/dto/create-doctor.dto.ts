import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';

export class CreateDoctorDto {}
export class CreateRecordDto {
  @IsNotEmpty()
  @IsNumber()
  appointmentId: number;

  @IsNotEmpty()
  @IsNumber()
  patientId: number;

  @IsString()
  @IsOptional()
  disease: string;

  @IsArray()
  @IsOptional()
  @Validate(IsString, {
    each: true,
  })
  medicines?: any[];

  @IsDateString()
  nextDate?: Date;
}
