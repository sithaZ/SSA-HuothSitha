import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

// Import your CUSTOM DatabaseModule (This fixes the DATA_SOURCE error)
import { DatabaseModule } from './database/entities/database.module';

import { ReceiptsModule } from './receipts/receipts.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentsModule } from './payments/payments.module';
import { NotificationModule } from './notifications/notifications.module';
import { CoreModule } from './core/core.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { NotifyInterceptor } from './notifications/notify.interceptor';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomersModule } from './modules/customers/customer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // 1. GraphQL Configuration (Schema First)
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: [join(process.cwd(), 'src/**/*.graphql')], // Looks for your .graphql files
      playground: true,
    }),

    // 2. Database Configuration (MUST use your custom module)
    DatabaseModule.forRoot({
      host: process.env.POSTGRES_HOST || 'postgres',
      port: Number(process.env.POSTGRES_PORT) || 5432,
      username: process.env.POSTGRES_USER || 'postgres',
      password: process.env.POSTGRES_PASSWORD || 'postgres',
      database: process.env.POSTGRES_DB || 'order-worker',
    }),

    // Feature Modules
    PaymentsModule,
    OrdersModule,
    ReceiptsModule,
    CustomersModule,
    NotificationModule.forRoot({
      appName: 'API-Gateway',
      defaultChannel: 'log',
      enable: true,
    }),
    CoreModule,
  ],
  
  controllers: [AppController],
 
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: NotifyInterceptor,
    },
  ],
})
export class AppModule {}