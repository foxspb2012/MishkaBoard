import { CategoryInterface } from '../../common/shared-types';
import { Entity } from '../../common/core';

export class CategoryEntity implements Entity<CategoryEntity>, CategoryInterface {
  public id: number;
  public name: string;
  public image: string;

  constructor(category: CategoryInterface) {
    this.fillEntity(category);
  }

  public fillEntity(entity: CategoryInterface) {
    this.id = entity.id;
    this.name = entity.name;
    this.image = entity.image;
  }

  public toObject(): CategoryEntity {
    return { ...this }
  }
}
