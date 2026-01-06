import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
@Injectable()
export class PhoneNormalizePipe implements PipeTransform {
    transform(value: any) {
        // 1. Check the value is a string
        if (typeof value !== 'string') {
            throw new BadRequestException('Phone number must be a string');
        }
        //2. Remove space dashes parenthese
        let cleaned = value.replace(/[\s\-()]/g, '');
        //3. check empty
        if (!cleaned){
            throw new BadRequestException('Phone number cannot be empty');
        }
        //4. Normalized prefix +855
        if (cleaned.startsWith('0')) {
            cleaned = '+855' + cleaned.substring(1);
        }
        //5. length check
        if (cleaned.length < 9)
        {
            throw new BadRequestException('Phone number is too short');
        }
        return cleaned;
    }
}
