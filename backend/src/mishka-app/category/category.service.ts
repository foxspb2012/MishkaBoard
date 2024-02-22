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

  public async getCategories(): Promise<CategoryInterface[]> {
    return this.categoryRepository.find();
  }

  public async getListCategories(): Promise<CategoryInterface[]> {
    return this.categoryRepository.findList();
  }

  public async findByCategoryId(id: string): Promise<CategoryInterface | null> {
    return this.categoryRepository.findById(id);
  }

  public async createCategory(dto: CreateCategoryDto): Promise<CategoryInterface> {

    const existCategory = await this.categoryRepository.findByCategoryName(dto.name);

    if (existCategory) {
      throw new Error(`Category with name «${dto.name}» exists.`);
    }

    const categoryEntity = new CategoryEntity(dto);
    return this.categoryRepository.create(categoryEntity);
  }

  public async updateCategory(id: string, dto: UpdateCategoryDto): Promise<CategoryInterface> {
    return this.categoryRepository.update(id, new CategoryEntity(dto));
  }

  public async deleteCategory(id: string): Promise<void> {
    await this.categoryRepository.destroy(id);
  }
}
