import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { TrimPipe } from './trim.pipe';
import { PhoneNormalizePipe } from './phone-normalize.pipe';
import { DateValidationPipe } from './dob-validation.pipe'; // User's class name

@Injectable()
export class VerifyCustomerPipe implements PipeTransform {
  private trimPipe = new TrimPipe();
  private phonePipe = new PhoneNormalizePipe();
  private dobPipe = new DateValidationPipe();

  async transform(value: any) {
    if (!value || typeof value !== 'object') {
      throw new BadRequestException('Request body must be an object');
    }

    const normalized = { ...value };

    if (normalized.fullName) {
      normalized.fullName = this.trimPipe.transform(normalized.fullName, {
        type: 'body',
        data: 'fullName',
      });
    } else {
    }

    if (normalized.dob) {
      normalized.dob = this.dobPipe.transform(normalized.dob, {
        type: 'body',
        data: 'dob',
      });
    } else {
      throw new BadRequestException('dob is required');
    }

    if (normalized.phone) {
      normalized.phone = this.phonePipe.transform(normalized.phone);
    } else {
      throw new BadRequestException('phone is required');
    }

    return normalized;
  }
}
