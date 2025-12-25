import { Inject, Injectable } from '@nestjs/common';
import { NOTIFICATION_FEATURES, NOTIFICATION_OPTIONS } from './constants';
import {
  NotificationFeatureOptions,
  NotificationModuleOptions,
  NotificationChannel,
} from './interfaces';

@Injectable()
export class NotificationsService {
  constructor(
    @Inject(NOTIFICATION_OPTIONS)
    private readonly options: NotificationModuleOptions,

    @Inject(NOTIFICATION_FEATURES)
    private readonly features: NotificationFeatureOptions[],
  ) {}

  private getFeature(
    featureName: string,
  ): NotificationFeatureOptions | undefined {
 
    return this.features.find(
      (f) => f.featureName.toLowerCase() === featureName.toLowerCase(),
    );
  }

  private resolveChannels(
    feature?: NotificationFeatureOptions,
  ): NotificationChannel[] {
    if (!this.options.enable) return [];
    if (feature?.channels?.length) return feature.channels;
    return [this.options.defaultChannel];
  }

  notify(featureName: string, event: string, payload: any) {
    if (!this.options.enable)
      return { skipped: true, reason: 'notifications disabled' };

    const feature = this.getFeature(featureName);

    if (feature?.enable === false) {
      return {
        skipped: true,
        reason: `notifications for ${featureName} are disabled`,
      };
    }

    const channels = this.resolveChannels(feature);
    const prefix = feature?.prefix ?? `[${featureName.toUpperCase()}]`;
    const message = `${prefix} (${this.options.appName}) ${event}`;

    for (const ch of channels) {
      console.log(`[${ch.toUpperCase()}] ${message}`, payload);
    }

    return { ok: true, channels, featureName, event };
  }
}
