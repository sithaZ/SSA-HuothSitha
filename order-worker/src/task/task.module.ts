import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { NotificationModule } from '../notifications/notifications.module';

@Module({
  imports: [
    NotificationModule.forFeature({
      featureName: 'tasks',
      prefix: '[TASKS]',
      channels: ['log'],
    }),
  ],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
