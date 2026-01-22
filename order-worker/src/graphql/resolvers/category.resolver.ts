import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CategoryService } from '../../modules/category/category.service';

@Resolver('Category')
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Query('categories')
  async categories() {
    return this.categoryService.findAll();
  }

  @Mutation('createCategory')
  async createCategory(
    @Args('name') name: string,
    @Args('description') description: string,
  ) {
    return this.categoryService.create({ name, description });
  }
}