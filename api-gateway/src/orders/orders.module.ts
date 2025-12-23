import { forwardRef, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { PaymentsModule } from 'src/payments/payments.module';
import { NotificationModule } from '../notifications/notifications.module';
import { ReceiptsModule } from 'src/receipts/receipts.module';

@Module({
  imports: [
    forwardRef(() => PaymentsModule),
    NotificationModule.forFeature({
      featureName: 'Orders',
      prefix: '[ORDERS]',
      channels: ['log', 'telegram'],
    }),
    ClientsModule.register([
      {
        name: 'ORDERS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://rabbitmq:5672'],
          queue: 'orders_queue',
          queueOptions: { durable: false },
        },
      },
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})

export class OrdersModule {}