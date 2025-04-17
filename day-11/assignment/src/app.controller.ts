import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { RolesGuard } from './common/guards/roles.guard';
import { Role, Roles } from './common/decorators/roles.decorator';
import * as jwt from 'jsonwebtoken';
import { ValidateTokenGuard } from './common/guards/validate-token.guard';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseInterceptors(TransformInterceptor)
  @UseGuards(ValidateTokenGuard, RolesGuard)
  @Get()
  @Roles(Role.Admin)
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('login')
  login(@Body() userDto) {
    const token = jwt.sign(userDto, 'secret-key');
    return token;
  }
}
