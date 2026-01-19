import { Injectable, Inject, NotFoundException, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @Inject('CATEGORY_REPO')
    private readonly categoryRepo: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    return this.categoryRepo.save(createCategoryDto);
  }

  async findAll() {
    return this.categoryRepo.find();
  }

  async findOne(id: string) {
    const category = await this.categoryRepo.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.findOne(id);
    this.categoryRepo.merge(category, updateCategoryDto);
    return this.categoryRepo.save(category);
  }

  async remove(id: string) {
  const category = await this.findOne(id);

  try {
    return await this.categoryRepo.remove(category);
  } catch (error) {
    
    if (error.code === '23503') {
      throw new BadRequestException('Cannot delete category because it has related products.');
    }
    throw error;
  }
  }
}