import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices/enums/transport.enum';
import { MicroserviceOptions } from '@nestjs/microservices/interfaces/microservice-configuration.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL || 'amqp://rabbitmq:5672'],
      queue: 'orders_queue',
      queueOptions: { durable: false },
    },
  });

  await app.startAllMicroservices();
  
  // FIX: Listen on '0.0.0.0' so Docker maps it to your host machine correctly
  await app.listen(3000, '0.0.0.0'); 
  
  console.log(`Order Worker is running on: ${await app.getUrl()}`);
}
bootstrap();