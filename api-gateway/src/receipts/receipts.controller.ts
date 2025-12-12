import { Controller, Get, Post } from '@nestjs/common';
import { ReceiptsService } from './receipts.service';

@Controller()
export class ReceiptsController {
  constructor(private readonly receiptService: ReceiptsService) {}
  @Get('receipts')
  findAll() {
    return this.receiptService.hello();
  }

  @Post('receipts')
  createReceipts() {
    return 'Create receipt';
  }
}
