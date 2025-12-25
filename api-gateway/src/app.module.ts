import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReceiptsModule } from './receipts/receipts.module';
import { OrdersModule } from './orders/orders.module';
import { ReceiptsEntity} from './database/entities/receipts.entity';
import { PaymentsModule } from './payments/payments.module';
import { NotificationModule } from './notifications/notifications.module';
import { CoreModule } from './core/core.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { NotifyInterceptor } from './notifications/notify.interceptor';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST || 'postgres',
      port: 5432,
      username: 'postgres', 
      password: 'postgres', 
      database: 'order-worker', 
      entities: [ReceiptsEntity], 
      synchronize: true, 
    }),
    PaymentsModule,
    OrdersModule,
    ReceiptsModule,
    NotificationModule.forRoot({
      appName: 'API-Gateway',
      defaultChannel: 'log',
      enable: true,
    }),
    CoreModule,
  ],
  providers: [
    // Challenge B: Register the interceptor globally
    {
      provide: APP_INTERCEPTOR,
      useClass: NotifyInterceptor,
    },
  ],
})
export class AppModule {}