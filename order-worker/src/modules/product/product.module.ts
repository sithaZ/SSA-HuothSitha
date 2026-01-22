import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/entities/database.module';
import { Product } from './entities/product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Category } from '../category/entities/category.entity';

@Module({
  imports: [DatabaseModule.forFeature([Product, Category])],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})

export class ProductModule {}