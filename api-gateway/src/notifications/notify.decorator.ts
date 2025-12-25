import { SetMetadata } from '@nestjs/common';
import { NOTIFY_METADATA } from './constants';

export const Notify = (feature: string, event: string) => 
  SetMetadata(NOTIFY_METADATA, { feature, event });