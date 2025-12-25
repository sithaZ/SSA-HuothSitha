import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PaymentsService } from 'src/payments/payments.service';
import { NotificationsService } from '../notifications/notifications.service';
@Injectable()

export class OrdersService {
  constructor(  
    @Inject('ORDERS_SERVICE') private readonly client: ClientProxy,
    private readonly paymentsService: PaymentsService,
    private readonly notifications: NotificationsService,
  ) {}

  createOrder(orderDto: any) {
    
    this.client.emit('order_created', '');

    
    // this.notifications.notify('orders', 'order_created', {
    //   order: orderDto,
    // });

    return { status: 'Order accepted', order: orderDto };
  }
  deleteOrder() {
    this.client.emit('order_deleted', {});
    return { status: 'Order deletion requested' };
  }
}

