import { 
  Injectable, 
  Inject, 
  NotFoundException, 
  ConflictException 
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { Category } from '../category/entities/category.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { GetProductsFilterDto } from './dto/get-products-filter.dto';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_REPO')
    private readonly productRepo: Repository<Product>,
    
    @Inject('CATEGORY_REPO')
    private readonly categoryRepo: Repository<Category>,
  ) {}

  async create(dto: CreateProductDto) {
    
    const categoryExists = await this.categoryRepo.findOne({ where: { id: dto.categoryId } });
    
    if (!categoryExists) {
      throw new NotFoundException(`Category with ID ${dto.categoryId} not found`);
    }

    try {
      return await this.productRepo.save(dto);
    } catch (error) {
      
      if (error.code === '23505') {
        throw new ConflictException('A product with this SKU already exists');
      }
      throw error;
    }
  }

  async findAll(filterDto: GetProductsFilterDto) {
    const { categoryId, minPrice, maxPrice, page, limit } = filterDto;
    
    const query = this.productRepo.createQueryBuilder('product');
    query.leftJoinAndSelect('product.category', 'category');

    if (categoryId) query.andWhere('product.categoryId = :categoryId', { categoryId });
    if (minPrice) query.andWhere('product.price >= :minPrice', { minPrice });
    if (maxPrice) query.andWhere('product.price <= :maxPrice', { maxPrice });

    // Pagination Logic
    const p = page || 1;
    const l = limit || 10;
    const skip = (p - 1) * l;
    
    query.skip(skip).take(l);

    const [data, total] = await query.getManyAndCount();

    return {
      data,
      meta: {
        total,
        page: p,
        limit: l,
        lastPage: Math.ceil(total / l),
      }
    };
  }

  async findOne(id: string) {
    const product = await this.productRepo.findOne({ 
      where: { id },
      relations: ['category'] 
    });
    if (!product) throw new NotFoundException(`Product ${id} not found`);
    return product;
  }

 

  async update(id: string, dto: UpdateProductDto) {
    const product = await this.findOne(id);
    this.productRepo.merge(product, dto);
    return this.productRepo.save(product);
  }

  async remove(id: string) {
    const product = await this.findOne(id);
    return this.productRepo.remove(product);
  }
}