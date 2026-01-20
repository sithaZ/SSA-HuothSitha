import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices/enums/transport.enum';
import { MicroserviceOptions } from '@nestjs/microservices/interfaces/microservice-configuration.interface';

async function bootstrap() {
  // 1. Create the HTTP Application first
  const app = await NestFactory.create(AppModule);

  // 2. Connect the Microservice (RabbitMQ) to the HTTP App
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL || 'amqp://rabbitmq:5672'],
      queue: 'orders_queue',
      queueOptions: { durable: false },
    },
  });

  // 3. Start the Microservice listeners
  await app.startAllMicroservices();

  // 4. Start the HTTP Server on port 3000
  await app.startAllMicroservices();
  await app.listen(3000);
  console.log(`Order Worker is running on: ${await app.getUrl()}`);
}
bootstrap();