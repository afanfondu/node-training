import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get('place-order/:userId')
  placeOrder(@Param('userId', ParseIntPipe) userId: number) {
    return this.ordersService.placeOrder(userId);
  }
}
