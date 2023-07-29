import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtStrategyGuard } from 'src/auth/gruad/auth.graud';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  @UseGuards(JwtStrategyGuard)
  @Get('myrecord')
  myRecord(@Request() req: any) {
    return this.userService.myRecord(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }
  @UseGuards(JwtStrategyGuard)
  update(@Request() req: any, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(req.user, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
