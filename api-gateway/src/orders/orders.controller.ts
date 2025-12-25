import { Body, Controller, Post, Delete } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Notify } from 'src/notifications/notify.decorator';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @Notify('orders', 'order_created') 
  async createOrder(@Body() dto: any) {
    return this.ordersService.createOrder(dto);
  }

  @Delete()
  delete() {
    console.log('controller delete');
    return this.ordersService.deleteOrder();
  }
}
