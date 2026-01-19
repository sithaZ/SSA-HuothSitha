import { Body, Controller, Post } from '@nestjs/common';
import { NotificationsService } from '../notifications/notifications.service';

@Controller('notifications')
export class TaskController{
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  sendNotification(@Body() body: { event: string; payload: any }) {
    return this.notificationsService.notify('tasks', body.event, body.payload);
  }
}
