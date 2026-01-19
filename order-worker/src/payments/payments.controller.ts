
import { Controller, Get, Post } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get()
  findAll() {
    return this.paymentsService.hello();
  }

  @Post()
  createPayment() {
    console.log('Creating a new payment...');
    return 'This action adds a new payment';
  }
}
