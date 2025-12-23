import { DynamicModule, Module, Global } from '@nestjs/common';
import { NOTIFICATION_OPTIONS, NOTIFICATION_FEATURES } from './constants';
import {
  NotificationModuleOptions,
  NotificationFeatureOptions,
} from './interfaces';
import { NotificationsService } from './notification.service';
@Global()
@Module({})
export class NotificationModule {
  static forRoot(options: NotificationModuleOptions): DynamicModule {
    return {
      module: NotificationModule,
      providers: [
        {
          provide: NOTIFICATION_OPTIONS,
          useValue: options,
        },

        {
          provide: NOTIFICATION_FEATURES,
          useValue: [] as NotificationFeatureOptions[],
        },
        NotificationsService,
      ],
      exports: [NotificationsService],
      global: true,
    };
  }

  static forFeature(feature: NotificationFeatureOptions): DynamicModule {
    return {
      module: NotificationModule,
      providers: [
        {
          provide: NOTIFICATION_FEATURES,

          useFactory: (features: NotificationFeatureOptions[]) => {
            return [...features, feature];
          },
          inject: [NOTIFICATION_FEATURES],
        },
      ],
      exports: [NotificationsService],
    };
  }
}
