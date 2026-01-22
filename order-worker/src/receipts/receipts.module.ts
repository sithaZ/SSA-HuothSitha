import { Module } from '@nestjs/common';
import { ReceiptsService } from './receipts.service';
import { ReceiptsController } from './receipts.controller';
import { ReceiptsEntity } from '../database/entities/receipts.entity';
import { NotificationModule } from '../notifications/notifications.module'; 
import { DatabaseModule } from 'src/database/entities/database.module';

import { ReceiptsResolver } from './receipts.resolver';

@Module({
  imports: [
    DatabaseModule.forFeature([ReceiptsEntity]), 
    NotificationModule.forFeature({
      featureName: 'Receipts',
      prefix: '[RECEIPTS]',
      channels: ['log', 'telegram'], })
  ],  
  controllers: [ReceiptsController],
  
  providers: [ReceiptsService, ReceiptsResolver],
})
export class ReceiptsModule {}