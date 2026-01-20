import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ReceiptsService } from './receipts.service';

@Resolver('Receipt')
export class ReceiptsResolver {
  constructor(private readonly receiptsService: ReceiptsService) {}

  @Query('receipts')
  async getReceipts() {
    return this.receiptsService.findAll();
  }

  @Query('receipt')
  async getReceipt(@Args('receiptId') id: string) {
    return this.receiptsService.findOne(id);
  }

  @Mutation('createReceipt')
  async createReceipt(
    @Args('name') name: string,
    @Args('price') price: number,
    @Args('issuedAt') issuedAt: string,
  ) {
    return this.receiptsService.create({ name, price, issuedAt });
  }

  @Mutation('updateReceipt')
  async updateReceipt(
    @Args('receiptId') id: string,
    @Args('name') name?: string,
    @Args('price') price?: number,
    @Args('issuedAt') issuedAt?: string,
  ) {
    return this.receiptsService.update(id, { name, price, issuedAt });
  }

  @Mutation('deleteReceipt')
  async deleteReceipt(@Args('receiptId') id: string) {
    await this.receiptsService.remove(id);
    return true;
  }
}