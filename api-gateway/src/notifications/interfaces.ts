export type NotificationChannel = 'log' | 'email' | 'sms' | 'telegram';

export interface NotificationModuleOptions {
  appName: string;
  defaultChannel: NotificationChannel;
  enable: boolean;
}

export interface NotificationFeatureOptions {
  featureName: string;
  prefix?: string;
  enable?: boolean;
  channels?: NotificationChannel[];
}