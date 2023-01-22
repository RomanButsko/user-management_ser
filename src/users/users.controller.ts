import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @HttpCode(200)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @HttpCode(200)
  @Patch('block/:id')
  updateStatusBlock(@Param('id') id: string) {
    return this.usersService.updateStatusBlock(+id);
  }

  @HttpCode(200)
  @Patch('unblock/:id')
  updateStatusUnBlock(@Param('id') id: string) {
    return this.usersService.updateStatusUnBlock(+id);
  }

  @HttpCode(200)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
