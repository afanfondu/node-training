import { Body, Controller, Post } from '@nestjs/common';
import { ProcessOrderDto } from './dto/process-order.dto';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('process-order')
  processOrder(@Body() processOrderDto: ProcessOrderDto) {
    return this.paymentsService.processOrder(processOrderDto);
  }
}
