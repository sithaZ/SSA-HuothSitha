import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { ReceiptsModule } from './receipts/receipts.module';

@Module({
  imports: [OrdersModule, ReceiptsModule],
})
export class AppModule {}
