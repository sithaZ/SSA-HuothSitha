import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NotificationsService } from './notifications.service';
import { NOTIFY_METADATA } from './constants';

@Injectable()
export class NotifyInterceptor implements NestInterceptor {
  constructor(
    private readonly reflector: Reflector,
    private readonly notificationsService: NotificationsService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Read metadata set by @Notify decorator from the method handler
    const metadata = this.reflector.get<{ feature: string; event: string }>(
      NOTIFY_METADATA,
      context.getHandler(),
    );

    return next.handle().pipe(
      tap((data) => {
        if (metadata) {
          // Trigger notification using the method's response as the payload
          this.notificationsService.notify(metadata.feature, metadata.event, data);
        }
      }),
    );
  }
}