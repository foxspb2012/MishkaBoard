import { OfferInterface, OfferType, CategoryInterface, UserInterface } from '../../common/shared-types';
import { Entity } from '../../common/core';

export class OfferEntity implements Entity<OfferInterface>, OfferInterface {
  public id: string;
  public title: string;
  public description: string;
  public postDate: Date;
  public image: string;
  public type: OfferType;
  public price: number;
  public categories: CategoryInterface[];
  public userId: UserInterface;

  constructor(offer: OfferInterface) {
    this.fillEntity(offer);
  }

  public fillEntity(entity: OfferInterface) {
    this.title = entity.title;
    this.description = entity.description;
    this.postDate = new Date();
    this.image = entity.image;
    this.type = entity.type;
    this.price = entity.price;
    this.categories = entity.categories;
    this.userId = entity.userId;
  }

  public toObject(): OfferInterface {
    return {
      ...this,
      category: this.categories.map(({id}) => ({ id }))
    };
  }
}
