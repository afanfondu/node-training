import { IsInt, IsString } from 'class-validator';

export class ProcessOrderDto {
  @IsInt()
  orderId: number;

  @IsString()
  paymentMethod: string;

  @IsInt()
  amount: number;
}
