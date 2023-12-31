import { OfferType } from '../types/offer-type.enum.js';
import { Offer } from '../types/offer.type.js';

export const createOffer = (row: string) => {
  const tokens = row.replace('\n', '').split('\t');
  const [
    title,
    description,
    createdDate,
    image,
    type,
    price,
    categories,
    firstname,
    lastname,
    email, ,
    passwordHash,
  ] = tokens;
  return {
    title,
    description,
    postDate: new Date(createdDate),
    image,
    type: OfferType[type as 'Buy' | 'Sell'],
    categories: categories.split(';').map((name) => ({name})),
    price: Number.parseInt(price, 10),
    user: {email, firstname, lastname, passwordHash},
  } as Offer;
};

export const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : '';
