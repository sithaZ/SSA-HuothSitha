import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ReceiptsModule } from './receipts/receipts.module';
import { OrdersModule } from './orders/orders.module';
import { ReceiptsEntity } from './database/entities/receipts.entity';
import { PaymentsModule } from './payments/payments.module';
import { NotificationModule } from './notifications/notifications.module';
import { CoreModule } from './core/core.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { NotifyInterceptor } from './notifications/notify.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST || 'localhost', 
      port: Number(process.env.POSTGRES_PORT) || 5432,
      username: process.env.POSTGRES_USER || 'postgres',
      password: process.env.POSTGRES_PASSWORD || 'postgres',
      database: process.env.POSTGRES_DB || 'order-worker',
      entities: [ReceiptsEntity],
      synchronize: true,
    }),
    PaymentsModule,
    OrdersModule,
    ReceiptsModule,
    // ProductModule, 
    // CategoryModule, 
    NotificationModule.forRoot({
      appName: 'API-Gateway',
      defaultChannel: 'log',
      enable: true,
    }),
    CoreModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: NotifyInterceptor,
    },
  ],
})
export class AppModule {}