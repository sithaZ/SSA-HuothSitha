import { Controller, Get, Post, Body} from '@nestjs/common';
import { AppService } from './app.service';
import { DateValidationPipe } from './common/pipes/dob-validation.pipe';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
 
  @Post('validate-dob') 
  
  validateDob(@Body('dob', DateValidationPipe) dob: string) {
    return { message: 'Date of birth is valid', dob };
  }
}
