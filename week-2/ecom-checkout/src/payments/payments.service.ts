import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ProcessOrderDto } from './dto/process-order.dto';
import { OrdersService } from 'src/orders/orders.service';
import { Payment } from './entities/payment.entity';
import { OrderStatus } from 'src/orders/entites/order.entity';

@Injectable()
export class PaymentsService {
  private paymets: Payment[] = [];
  private idCounter = 1;

  constructor(
    @Inject(forwardRef(() => OrdersService))
    private readonly orderService: OrdersService,
  ) {}

  processOrder(processOrderDto: ProcessOrderDto) {
    const order = this.orderService.findOne(processOrderDto.orderId);
    if (!order) throw new BadRequestException('Order not found');
    if (order.status === OrderStatus.Paid)
      throw new BadRequestException('Order already paid');

    const payment: Payment = {
      id: this.idCounter++,
      ...processOrderDto,
    };
    this.paymets.push(payment);

    order.paymentId = payment.id;
    order.status = OrderStatus.Paid;

    return payment;
  }

  findOne(paymentId: number | undefined) {
    return this.paymets.find((payment) => payment.id === paymentId);
  }
}
