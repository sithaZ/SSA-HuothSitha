import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { ProductService } from '../../modules/product/product.service';
import { CategoryService } from '../../modules/category/category.service';

@Resolver('Product')
export class ProductResolver {
  constructor(
    private readonly productService: ProductService,
    private readonly categoryService: CategoryService,
  ) {}

  @Query('products')
  async products() {
   
    const result = await this.productService.findAll({}); 
    return result.data; 
  }

  @Query('product')
  async product(@Args('id') id: string) {
    return this.productService.findOne(id);
  }

  @Mutation('createProduct')
  async createProduct(
    @Args('name') name: string,
    @Args('price') price: number,
    @Args('categoryId') categoryId: string,
    @Args('sku') sku: string,
  ) {
    return this.productService.create({
      name,
      price,
      categoryId,
      sku,
    });
  }

  
  @ResolveField('category')
  async category(@Parent() product: any) {
    return this.categoryService.findOne(product.categoryId);
  }
}