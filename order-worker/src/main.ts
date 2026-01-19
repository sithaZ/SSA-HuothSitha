import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { ValidationPipe } from '@nestjs/common';
// import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { Transport } from '@nestjs/microservices/enums/transport.enum';
import { MicroserviceOptions } from '@nestjs/microservices/interfaces/microservice-configuration.interface';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);

  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true,
  //     forbidNonWhitelisted: true,
  //     transform: true,
  //   }),
  // );

  
  // app.useGlobalInterceptors(new LoggingInterceptor());

  // await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
  // console.log(`Application is running on: ${await app.getUrl()}`);
   const app = await NestFactory.createMicroservice<MicroserviceOptions>(
      AppModule,
      {
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://rabbitmq:5672'],
          queue: 'orders_queue',
          queueOptions: { durable: false },
        },
      },
    );
  
    await app.listen();
}
bootstrap();