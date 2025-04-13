import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Order, OrderStatus } from './entites/order.entity';
import { CartService } from 'src/cart/cart.service';
import { UsersService } from 'src/users/users.service';
import { PaymentsService } from 'src/payments/payments.service';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class OrdersService {
  constructor(
    private readonly cartService: CartService,
    private readonly usersService: UsersService,
    @Inject(forwardRef(() => PaymentsService))
    private readonly paymentsService: PaymentsService,
    private readonly productsService: ProductsService,
  ) {}

  private orders: Order[] = [];
  private idCounter = 1;

  findAll() {
    return this.orders.map((order) => {
      const user = this.usersService.findOne(order.userId);
      const payment = this.paymentsService.findOne(order.paymentId);
      const cartItems = order.cartItems.map((item) => ({
        ...item,
        product: this.productsService.findOne(item.productId),
      }));
      return {
        ...order,
        cartItems,
        user,
        payment,
      };
    });
  }

  placeOrder(userId: number) {
    const cartItems = this.cartService.findAllByUser(userId);
    if (cartItems.length === 0)
      throw new BadRequestException('No items in cart');

    cartItems.forEach((cart) => {
      this.cartService.remove(cart.id, false);
    });

    const order: Order = {
      id: this.idCounter++,
      userId,
      cartItems,
      totalAmount: this.cartService.getTotalAmount(cartItems),
      status: OrderStatus.Pending,
    };
    this.orders.push(order);
    return order;
  }

  findOne(orderId: number) {
    return this.orders.find((order) => order.id === orderId);
  }
}
