import { Injectable } from "@nestjs/common";    
@Injectable()
    export class CustomersService {
    private readonly blockedPhones = ['+85500000000', '+85512345678'];
    private readonly blockedNationalIds = ['BLOCK123','X9999999']
    
    isblockedPhone(phone: string): boolean {
        return this.blockedPhones.includes(phone);
    }
    isblockedNationalId(nationalId: string): boolean {
        if(!nationalId) {
            return false;
        }
        return this.blockedNationalIds.includes(nationalId);
    }
}