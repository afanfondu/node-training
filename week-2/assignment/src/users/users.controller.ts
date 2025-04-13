import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseFilters,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserFilter } from './filters/create-user.filter';
import { CreatePersonDto } from './dto/create-person.dto';
import { CreatePersonFilter } from './filters/create-person.filter';
import { ExtractHeader } from './decorators/extract-header.decorator';
import { CreateEmploymentDto } from './dto/create-employment.dto';
import { CreateEmploymentFilter } from './filters/create-employment.filter';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseFilters(CreateEmploymentFilter)
  @Post('employment')
  createEmployment(
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    dto: CreateEmploymentDto,
  ) {
    return dto;
  }

  @UseFilters(CreatePersonFilter)
  @Post('person')
  createPerson(
    @Body(new ValidationPipe({ transform: true }))
    createPersonDto: CreatePersonDto,
  ) {
    return createPersonDto;
  }

  @UseFilters(CreateUserFilter)
  @Post()
  create(
    @Body(new ValidationPipe({ transform: true })) createUserDto: CreateUserDto,
  ) {
    return createUserDto;
  }

  // @Timeout(2000)
  @Get()
  findAll() {
    console.log('running');
    return 'users';
  }

  @Get(':id/role/:role')
  getUser(@Param('id') id: string, @Param('role') role: string) {
    return this.userService.getUser(+id, role);
  }
}
