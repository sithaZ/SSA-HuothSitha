import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class TrimPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (typeof value !== 'string') {
      return value;
    }

    const trimmed = value.trim();

    
    if (trimmed.length === 0) {
      throw new BadRequestException(`${metadata.data || 'Field'} should not be empty`);
    }

    return trimmed;
  }
}