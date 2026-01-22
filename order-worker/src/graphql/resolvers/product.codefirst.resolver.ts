import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { ProductType } from '../types/product.type';
import { CreateProductInput } from '../inputs/create-product.input';
import { ProductService } from '../../modules/product/product.service';
import { CategoryService } from '../../modules/category/category.service';
import { CategoryType } from '../types/category.type';

@Resolver(() => ProductType)
export class ProductCodeFirstResolver {
  constructor(
    private readonly productService: ProductService,
    private readonly categoryService: CategoryService,
  ) {}

  @Query(() => [ProductType])
  async products() {
    const result = await this.productService.findAll({});
    return result.data;
  }

  @Query(() => ProductType, { nullable: true })
  async product(@Args('id') id: string) {
    return this.productService.findOne(id);
  }

  @Mutation(() => ProductType)
  async createProduct(@Args('input') input: CreateProductInput) {
    
    return this.productService.create(input);
  }

  @ResolveField(() => CategoryType)
  async category(@Parent() product: ProductType) {
    return this.categoryService.findOne(product.categoryId);
  }
}