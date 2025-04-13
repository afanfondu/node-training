import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { ExtractHeaders } from 'src/decorators/extract-headers.decorator';
import { TransformUserPipe } from './pipes/transform-user.pipe';

@Controller('users')
export class UsersController {
  @Post()
  create(
    @Body(TransformUserPipe, ValidationPipe) createUserDto: CreateUserDto,
    @ExtractHeaders() headers,
  ) {
    console.log(headers);
    return createUserDto;
  }
}
