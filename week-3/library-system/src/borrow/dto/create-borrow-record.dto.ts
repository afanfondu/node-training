import { IsInt } from 'class-validator';

export class CreateBorrowRecordDto {
  @IsInt()
  bookId: number;

  @IsInt()
  memberId: number;
}
