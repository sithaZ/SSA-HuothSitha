import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReceiptsModule } from './receipts/receipts.module';
import { OrdersModule } from './orders/orders.module';
import { ReceiptsEntity} from './database/entities/receipts.entity';
import { PaymentsModule } from './payments/payments.module';
import { NotificationsModule } from './notifications/notifications.module';
import { CoreModule } from './core/core.module';


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
    NotificationsModule,
    CoreModule,
  ],
})
export class AppModule {}