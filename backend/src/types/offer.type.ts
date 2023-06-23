import { Category } from './category.type';
import { OfferType } from './offer-type.enum';
import { User } from './user.type';

export type Offer = {
  title: string;
  description: string;
  postDate: Date;
  image: string;
  type: OfferType
  price: number;
  categories: Category[];
  user: User;
}
