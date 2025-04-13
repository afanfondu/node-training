import { Body, Controller, Post } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return createProductDto;
  }
}
