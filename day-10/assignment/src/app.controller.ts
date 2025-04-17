import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { TransformNumbersInterceptor } from './common/interceptors/transform-numbers.interceptor';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseInterceptors(TransformNumbersInterceptor)
  @Post()
  create(@Body() body) {
    return body;
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  healthCheck(): string {
    return 'OK';
  }
}
