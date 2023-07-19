import { CategoryInterface, UserInterface } from '../index';
import { OfferType } from './offer-type.enum';

export interface OfferInterface {
  id?: string;
  title: string;
  description: string;
  postDate?: Date;
  image: string;
  type: OfferType;
  price: number;
  categories: CategoryInterface[];
  userId: UserInterface;
};
