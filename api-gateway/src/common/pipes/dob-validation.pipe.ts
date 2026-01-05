import {
  PipeTransform,
  Injectable,
  BadRequestException,
  ArgumentMetadata,
} from '@nestjs/common';

@Injectable()
export class DateValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    // 1. Check the value is a string
    if (typeof value !== 'string') {
      throw new BadRequestException('Date of birth must be a string');
    }

    // 2. Check if it has the correct format dd/mm/yyyy
    const match = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);

    if (!match) {
      throw new BadRequestException(
        'Date of birth must be in the format dd/mm/yyyy',
      );
    }

    // 3. Check year
    const year = Number(match[3]);
    if (year && year >= 2010) {
      throw new BadRequestException('Year must be less than 2010');
    }

    // IMPORTANT: You must return the value so the controller receives it!
    return value;
  }
}