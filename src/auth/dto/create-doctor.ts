/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { RegisterDto } from './create-auth.dto';
export class CreateAuthDoctorDto extends RegisterDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Za-z ]+$/, {
    message: 'Invalid value. Only letters and spaces are allowed.',
  })
  address :string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Za-z ]+$/, {
    message: 'Invalid value. Only letters and spaces are allowed.',
  })
  degree :string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Za-z ]+$/, {
    message: 'Invalid value. Only letters and spaces are allowed.',
  })
  major :string;
}
