import { Injectable } from '@nestjs/common';
import { CategoryInterface } from '../../common/shared-types';
import { CategoryRepository } from './category.repository';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './category.entity';

@Injectable()
export class CategoryService {
  constructor(
    private readonly categoryRepository: CategoryRepository,
  ) {
  }

  async getCategories(): Promise<CategoryInterface[]> {
    return this.categoryRepository.find();
  }

  async createCategory(dto: CreateCategoryDto): Promise<CategoryInterface> {

    const existCategory = await this.categoryRepository.findByCategoryName(dto.name);

    if (existCategory) {
      throw new Error(`Category with name «${dto.name}» exists.`);
    }

    const categoryEntity = new CategoryEntity(dto);
    return this.categoryRepository.create(categoryEntity);
  }

  async updateCategory(id: string, dto: UpdateCategoryDto): Promise<CategoryInterface> {
    return this.categoryRepository.update(id, new CategoryEntity(dto));
  }


  async deleteCategory(id: string): Promise<void> {
    await this.categoryRepository.destroy(id);
  }
}
