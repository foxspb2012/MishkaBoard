import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CategoryRepository } from './category.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModel, CategorySchema } from './category.model';

@Module({
  imports: [MongooseModule.forFeature([
    {name: CategoryModel.name, schema: CategorySchema}
  ])],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepository],
  exports: [CategoryRepository]
})
export class CategoryModule {}
