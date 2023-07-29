// import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto {
  name?: string;
  address?: string;

  degree?: string;

  major?: string;
}
