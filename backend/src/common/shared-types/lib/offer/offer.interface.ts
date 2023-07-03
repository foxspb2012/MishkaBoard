import { CategoryInterface } from '../category/category.interface';
import { OfferType } from './offer-type.enum';
import { UserInterface } from '../user/user.interface';

export type OfferInterface = {
  title: string;
  description: string;
  postDate: Date;
  image: string;
  type: OfferType;
  price: number;
  categories: CategoryInterface[];
  user: UserInterface;
};
