import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { ProductsService } from 'src/products/products.service';
import { UsersService } from 'src/users/users.service';
import { Cart } from './entities/cart.entity';
import { InsufficientStockExcpetion } from './exceptions/insufficient-stock.exception';

@Injectable()
export class CartService {
  private carts: Cart[] = [];
  private idCounter = 1;

  constructor(
    private readonly productsService: ProductsService,
    private readonly usersService: UsersService,
  ) {}

  create(createCartDto: CreateCartDto) {
    const { productId, userId, quantity } = createCartDto;

    const product = this.productsService.findOne(productId);
    if (!product) throw new BadRequestException('Product not found');

    const user = this.usersService.findOne(userId);
    if (!user) throw new BadRequestException('User not found');

    if (quantity > product.stock) throw new InsufficientStockExcpetion();

    product.stock -= quantity;

    const cart: Cart = {
      id: this.idCounter++,
      productId,
      userId,
      quantity,
    };

    this.carts.push(cart);
    return cart;
  }

  findAllByUser(userId: number) {
    return this.carts.filter((cart) => cart.userId === userId);
  }

  remove(id: number, addStock = true) {
    const cartIndex = this.carts.findIndex((cart) => cart.id === id);
    if (cartIndex === -1) throw new BadRequestException('Cart not found');

    const cart = this.carts[cartIndex];
    const product = this.productsService.findOne(cart.productId);
    if (!product) throw new BadRequestException('Product not found');

    if (addStock) product.stock += this.carts[cartIndex].quantity;

    this.carts.splice(cartIndex, 1);
    return cart;
  }

  getTotalAmount(cartItems: Cart[]) {
    return cartItems.reduce((total, cart) => {
      const product = this.productsService.findOne(cart.productId);
      return total + product!.price * cart.quantity;
    }, 0);
  }
}
