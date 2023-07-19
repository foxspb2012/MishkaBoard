import { Document, Types } from 'mongoose';
import { OfferInterface, OfferType } from '../../common/shared-types';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CategoryEntity } from '../category/category.entity';
import { SiteUserEntity } from '../site-user/site-user.entity';
import { SiteUserModel } from '../site-user/site-user.model';
import { CategoryModel } from '../category/category.model';

@Schema({
  collection: 'offers',
})
export class OfferModel extends Document implements OfferInterface {
  @Prop({
    trim: true,
    required: true
  })
  public title: string;

  @Prop({
    trim: true
  })
  public description: string;

  @Prop({
    default: ''
  })
  public image: string;

  @Prop()
  public postDate: Date;

  @Prop()
  public price: number;

  @Prop({
    required: true,
    type: String,
    enum: OfferType,
    default: OfferType.Buy
  })
  public type: OfferType;

  @Prop({
    required: true,
    type: [Types.ObjectId],
    ref: 'CategoryModel',
  })
  public categories: CategoryEntity[];

  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: 'SiteUserModel',
  })
  public userId: SiteUserEntity;
}

export const OfferSchema = SchemaFactory.createForClass(OfferModel);
