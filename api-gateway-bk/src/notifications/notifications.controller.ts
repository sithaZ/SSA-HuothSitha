import { Body, Controller, Post } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  sendNotification(@Body() body: { featureName: string; event: string; payload: any }) {
   
    return this.notificationsService.notify(body.featureName, body.event, body.payload);
  }
}