export type OfferInterface = {
  id?: string;
  title: string;
  description: string;
  postDate: string;
  image: string;
  type: OfferType;
  price: number;
  categories: string;
  userName: string;
  userEmail: string;
};

export enum OfferType {
  Buy = 'Buy',
  Sell = 'Sell',
}
