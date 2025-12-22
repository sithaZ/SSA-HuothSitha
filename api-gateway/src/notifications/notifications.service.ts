import { Inject, Injectable } from '@nestjs/common';
import { EVENT_PUBLISHER } from '../core/tokens';
import {ModuleNotificationOptions,NOTIFICATIONS_OPTIONS} from './notifications.interface';

type EventPublisher = { publish: (event: string, payload: any) => void };

@Injectable()
export class NotificationsService {
  constructor(
    @Inject(EVENT_PUBLISHER)
    private readonly publisher: EventPublisher,
    @Inject(NOTIFICATIONS_OPTIONS)
    private readonly options: ModuleNotificationOptions,
  ) { }

  notify(event: string, payload: any) {
    switch (this.options.type) {
      case 'log':
        console.log(`[LOG MODE] Notification: ${event}`);
        break;

      case 'email':
        console.log(`[EMAIL MODE] Sending email for: ${event}`);
        break;

      case 'sms':
        console.log(`[SMS MODE] Sending SMS for: ${event}`);
        break;

      default:
        console.log(`[UNKNOWN MODE] Event: ${event}`);
    }

    this.publisher.publish(event, payload);
    return { ok: true };
  }
}
