import { Body, Controller, Get, Param, Post, UsePipes } from '@nestjs/common';
import { CreateBorrowRecordDto } from './dto/create-borrow-record.dto';
import { BorrowService } from './borrow.service';
import { QuantityValidationPipe } from 'src/common/pipes/quantity-validation.pipe';

@Controller('borrow')
export class BorrowController {
  constructor(private readonly borrowService: BorrowService) {}

  @UsePipes(QuantityValidationPipe)
  @Post()
  create(@Body() createBorrowRecordDto: CreateBorrowRecordDto) {
    return this.borrowService.create(createBorrowRecordDto);
  }

  @Post('return/:borrowRecordId')
  returnBook(@Param('borrowRecordId') id: number) {
    return this.borrowService.returnBook(id);
  }

  @Get('/reports/overdue')
  overdueBooks() {
    return this.borrowService.overdueBooks();
  }
}
