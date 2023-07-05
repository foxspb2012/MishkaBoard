import { Document } from 'mongoose';
import { CategoryInterface } from '../../common/shared-types';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'categories',
})
export class CategoryModel extends Document implements CategoryInterface {
  @Prop({
    required: true,
    unique: true,
  })
  public name: string;

  @Prop({
    required: true,
  })
  public image: string;
}

export const CategorySchema = SchemaFactory.createForClass(CategoryModel);
