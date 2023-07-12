import { Document } from 'mongoose';
import { OfferInterface, OfferType } from '../../common/shared-types';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

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
    type: () => String,
    enum: OfferType
  })
  public type: OfferType;

  @Prop({default: []})
  public categories: string[];

  @Prop({
    required: true
  })
  public userId: string;
}

export const OfferSchema = SchemaFactory.createForClass(OfferModel);
