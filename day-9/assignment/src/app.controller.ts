import { Controller, Get, ParseBoolPipe, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { ExtractHeaders } from './decorators/extract-headers.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('info')
  getInfo(@ExtractHeaders() headers) {
    return headers;
  }

  @Get('admin')
  getAdmin() {
    return { message: 'Admin route' };
  }

  @Get('status')
  getStatus(@Query('isActive', ParseBoolPipe) isActive: boolean) {
    return { isActive };
  }

  @Get('reports')
  getReport() {
    return { message: 'Report data' };
  }
}
