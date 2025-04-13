import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { IsEvenPipe } from './common/pipes/is-even.pipe';
import { Timeout } from './common/decorators/timeout.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/hello')
  getHello() {
    return this.appService.getHello();
  }

  @Get('check-even/:num')
  @Timeout(2000)
  async checkEven(@Param('num', IsEvenPipe) num: number) {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return num;
  }
}
