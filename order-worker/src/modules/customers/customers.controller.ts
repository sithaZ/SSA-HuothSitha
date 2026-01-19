import { Body, Controller, Post } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { VerifyCustomerDto } from './dto/verify-customer.dto';
import { VerifyCustomerPipe } from '../../common/pipes/verify-customer.pipe';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post('verify')
verifyCustomer(@Body(VerifyCustomerPipe) body: any) { 
  return {
    ok: true,
    normalized: body,
  };
}
}
