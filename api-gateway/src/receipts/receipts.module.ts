import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReceiptsController } from './receipts.controller';
import { ReceiptsService } from './receipts.service';
import { ReceiptsEntity } from '../database/entities/receipts.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReceiptsEntity])], 
  controllers: [ReceiptsController],
  providers: [ReceiptsService],
})
export class ReceiptsModule {}