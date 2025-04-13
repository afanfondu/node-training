import { IsInt } from 'class-validator';

export class PlaceOrderDto {
  @IsInt()
  userId: number;
}
