export type OfferInterface = {
  id?: string;
  title: string;
  description: string;
  postDate: Date;
  image: string;
  type: OfferType;
  price: number;
  categories: string[];
  userId: string;
};

export enum OfferType {
  Buy = 'Buy',
  Sell = 'Sell',
}
