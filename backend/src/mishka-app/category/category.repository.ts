import { CRUDRepository } from '../../common/core';
import { CategoryEntity } from './category.entity';
import { CategoryInterface } from '../../common/shared-types';
import { InjectModel } from '@nestjs/mongoose';
import { CategoryModel } from './category.model';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { MAX_CATEGORIES_COUNT, SortType } from './category.constant';



@Injectable()
export class CategoryRepository implements CRUDRepository<CategoryEntity, string, CategoryInterface> {
  constructor(
    @InjectModel(CategoryModel.name) private readonly categoryModel: Model<CategoryModel>) {
  }

  public async create(item: CategoryEntity): Promise<CategoryInterface> {
    const newCategory = new this.categoryModel(item);
    return newCategory.save();
  }

  public async findOne(name: string): Promise<CategoryInterface | null> {
    return this.categoryModel
      .findOne({name})
      .exec();
  }

  public async destroy(id: string): Promise<void> {
    await this.categoryModel
      .deleteOne({_id: id});
  }

  public async findById(id: string): Promise<CategoryInterface | null> {
    return this.categoryModel
      .findById(id)
      .exec();
  }

  public async findByCategoryName(name: string): Promise<CategoryInterface | null> {
    return this.categoryModel
      .findOne({name})
      .exec();
  }

  public async update(id: string, item: CategoryEntity): Promise<CategoryInterface> {
    return this.categoryModel
      .findByIdAndUpdate(id, item.toObject(), {new: true})
      .exec();
  }

  public async find(): Promise<CategoryEntity[]> {
    return this.categoryModel
      .aggregate([
        {
          $lookup: {
            from: 'offers',
            let: {categoryId: '$_id'},
            pipeline: [
              {$match: {$expr: {$in: ['$$categoryId', '$categories']}}},
              {$project: {_id: 1}}
            ],
            as: 'offers'
          },
        },
        {
          $addFields:
            {id: {$toString: '$_id'}, offerCount: {$size: '$offers'}}
        },
        {$unset: 'offers'},
        {$limit: MAX_CATEGORIES_COUNT},
        {$sort: {offerCount: SortType.Down}}
      ]).exec();

  }
}
