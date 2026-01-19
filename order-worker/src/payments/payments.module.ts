import { Module, forwardRef } from '@nestjs/common';
import { OrdersModule } from 'src/orders/orders.module';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';

@Module({
  imports: [forwardRef(() => OrdersModule)],
  providers: [PaymentsService],
  controllers: [PaymentsController],
  exports: [PaymentsService],
})
export class PaymentsModule {}
