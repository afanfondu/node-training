import { Cart } from 'src/cart/entities/cart.entity';

export enum OrderStatus {
  Pending = 'pending',
  Paid = 'paid',
}

export class Order {
  id: number;
  userId: number;
  cartItems: Cart[];
  status: OrderStatus;
  totalAmount: number;
  paymentId?: number;
}
