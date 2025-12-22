import { DynamicModule, Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CoreModule } from '../core/core.module'; 
import {ModuleNotificationOptions} from './notifications.interface';  
import { NotificationsController } from './notifications.controller';


@Module({
  imports: [CoreModule], 
  providers: [NotificationsService],
  exports: [NotificationsService],
})
export class NotificationsModule {
  static register(options: ModuleNotificationOptions): DynamicModule{
    return {
      imports: [CoreModule],
      module: NotificationsModule,
      controllers: [NotificationsController],
      providers: [
        {
          provide: 'NOTIFICATIONS_OPTIONS',
          useValue: options,
        },
        NotificationsService,

      ],
      exports: [NotificationsService],

    };

  }
}
