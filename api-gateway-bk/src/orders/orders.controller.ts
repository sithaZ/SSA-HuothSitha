import { Body, Controller, Post, Delete } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Notify } from 'src/notifications/notify.decorator';
import { VerifyCustomerPipe } from 'src/common/pipes/verify-customer.pipe';
import { VerifyCustomerDto } from '../modules/customers/dto/verify-customer.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @Notify('orders', 'order_created') 
  async createOrder(@Body('customer', VerifyCustomerPipe)
  customer: VerifyCustomerDto,
   @Body()
   dto: any) {
    dto.customer = customer;
    console.log('controller createOrder', customer.fullName);
    return this.ordersService.createOrder(dto);
  }

  @Delete()
  delete() {
    console.log('controller delete');
    return this.ordersService.deleteOrder();
  }
}
