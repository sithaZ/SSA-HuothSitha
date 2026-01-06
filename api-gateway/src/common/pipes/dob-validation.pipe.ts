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

    const day = Number(match[1]);
    const month = Number(match[2]);
    const year = Number(match[3]);

    // 3. (NEW) Check for valid calendar date
    const date = new Date(year, month - 1, day);
    if (
      date.getFullYear() !== year ||
      date.getMonth() !== month - 1 ||
      date.getDate() !== day
    ) {
      throw new BadRequestException('Invalid calendar date');
    }

    // 4. Check year (Must be < 2010)
    if (year >= 2010) {
      throw new BadRequestException('Year must be less than 2010');
    }

    return value;
  }
}