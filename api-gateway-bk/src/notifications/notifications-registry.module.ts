import { Module } from '@nestjs/common';
import { NOTIFICATION_FEATURE_REGISTRY } from './constants';
import { NotificationFeatureOptions } from './interfaces'; // ensure filename matches

@Module({
  providers: [
    {
      provide: NOTIFICATION_FEATURE_REGISTRY,
      useValue: [] as NotificationFeatureOptions[], // The shared empty array
    },
  ],
  exports: [NOTIFICATION_FEATURE_REGISTRY],
})
export class NotificationsRegistryModule {}