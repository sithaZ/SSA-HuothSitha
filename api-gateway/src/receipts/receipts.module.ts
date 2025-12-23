import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReceiptsService } from './receipts.service';
import { ReceiptsController } from './receipts.controller';
import { ReceiptsEntity } from '../database/entities/receipts.entity';
import { NotificationModule } from '../notifications/notifications.module'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([ReceiptsEntity]), 
    NotificationModule.forFeature({
      featureName: 'Receipts',
      prefix: '[RECEIPTS]',
      channels: ['log', 'telegram'], })
  ],  
  controllers: [ReceiptsController],
  providers: [ReceiptsService],
})
export class ReceiptsModule {}