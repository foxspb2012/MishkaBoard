import { IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { DEFAULT_NEW_OFFER_COUNT } from '../offer.constant';

export class PostQuery {
  @Transform(({value}) => +value || DEFAULT_NEW_OFFER_COUNT)
  @IsNumber()
  @IsOptional()
  public limit = DEFAULT_NEW_OFFER_COUNT;
}
