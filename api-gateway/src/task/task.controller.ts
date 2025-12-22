import { Body, Controller, Post } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  sendNotification(@Body() body: { event: string; payload: any }) {
    // This calls the notify method we created in the service
    return this.notificationsService.notify(body.event, body.payload);
  }
}
