import { Controller } from '@nestjs/common';

import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller('orders')
export class OrdersController {
  @EventPattern('order_created')
  async handleOrderCreated(@Payload() data: any, @Ctx() context: RmqContext) {
    console.log('Order created event received:', data);
  }
  @EventPattern('order_deleted')
  async handleOrderDeleted(@Payload() data: any, @Ctx() context: RmqContext) {
    console.log('Order deleted event received:', data);
  }
}
