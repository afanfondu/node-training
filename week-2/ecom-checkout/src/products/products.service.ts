import { Injectable } from '@nestjs/common';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  private products: Product[] = [
    { id: 1, name: 'Product 1', price: 100, stock: 10 },
    { id: 2, name: 'Product 2', price: 200, stock: 20 },
    { id: 3, name: 'Product 3', price: 300, stock: 30 },
  ];

  findOne(id: number) {
    return this.products.find((product) => product.id === id);
  }
}
