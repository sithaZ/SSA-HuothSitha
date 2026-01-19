import { PipeTransform, Injectable, ForbiddenException, Inject } from '@nestjs/common';
import { CustomersService } from './customers.service';

@Injectable()
export class CustomerNotBlockedPipe implements PipeTransform {
  // 1. Inject the service
  constructor(private readonly customersService: CustomersService) {}

  transform(value: any) {
    // 2. Use the service to check if blocked
    if (this.customersService.isblockedPhone(value)) {
      throw new ForbiddenException(`This phone number (${value}) is blocked.`);
    }

    return value;
  }
}