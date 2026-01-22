import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ReceiptsService } from './receipts.service';
import { ReceiptType } from './dto/receipt.type'; 

@Resolver(() => ReceiptType)
export class ReceiptsResolver {
  constructor(private readonly receiptsService: ReceiptsService) {}

 
  @Query(() => [ReceiptType]) 
  async receipts() {
    return this.receiptsService.findAll();
  }

  
  @Query(() => ReceiptType)
  async receipt(@Args('receiptId') id: string) {
    return this.receiptsService.findOne(id);
  }

  
  @Mutation(() => ReceiptType)
  async createReceipt(
    @Args('name') name: string,
    @Args('price') price: number,
    @Args('issuedAt') issuedAt: string,
  ) {
    return this.receiptsService.create({ name, price, issuedAt });
  }

  
  @Mutation(() => Boolean)
  async deleteReceipt(@Args('receiptId') id: string) {
    await this.receiptsService.remove(id);
    return true;
  }
}