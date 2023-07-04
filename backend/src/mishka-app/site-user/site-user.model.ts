import { Document } from 'mongoose';
import { UserInterface } from '../../common/shared-types';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'users',
})
export class SiteUserModel extends Document implements UserInterface {
  @Prop()
  public avatar: string;

  @Prop({
    required: true,
    unique: true,
  })
  public email: string;

  @Prop({
    required: true,
  })
  public firstname: string;

  @Prop({
    required: true,
  })
  public lastname: string;

  @Prop({
    required: true,
  })
  public passwordHash: string;
}

export const SiteUserSchema = SchemaFactory.createForClass(SiteUserModel);
