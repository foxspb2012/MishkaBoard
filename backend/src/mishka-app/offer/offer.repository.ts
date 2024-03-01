import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CRUDRepository } from '../../common/core';
import { OfferInterface } from '../../common/shared-types';
import { OfferEntity } from './offer.entity';
import { OfferModel } from './offer.model';
import { SortType } from '../../common/shared-types';

@Injectable()
export class OfferRepository implements CRUDRepository<OfferEntity, string, OfferInterface> {
  constructor(
    @InjectModel(OfferModel.name) private readonly offerModel: Model<OfferModel>) {
  }

  public async create(item: OfferEntity): Promise<OfferInterface> {
    const newOffer = new this.offerModel(item);
    return newOffer.save();
  }

  public async findAll(): Promise<OfferInterface[] | null> {
    return this.offerModel
      .find()
      .sort({postDate: SortType.Down})
      .populate(['userId', 'categories'])
      .exec();
  }

  public async findNew(count: number): Promise<OfferInterface[]> {
    return this.offerModel
      .find()
      .sort({postDate: SortType.Down})
      .populate(['userId', 'categories'])
      .limit(count)
      .exec();
  }

  public async findById(id: string): Promise<OfferInterface | null> {
    return this.offerModel
      .findById(id)
      .populate(['userId', 'categories'])
      .exec();
  }

  public async findByCategoryId(categoryId: string, limit: number): Promise<OfferInterface[]> {
    return this.offerModel
      .find({categories: categoryId}, {}, {limit})
      .populate(['userId', 'categories'])
      .exec();
  }

  public async update(id: string, item: OfferEntity): Promise<OfferInterface> {
    return this.offerModel
      .findByIdAndUpdate(id, item.toObject(), {new: true})
      .exec();
  }

  public async destroy(id: string): Promise<void> {
    await this.offerModel
      .deleteOne({_id: id});
  }
}
