import { Injectable } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { OfferRepository } from './offer.repository';
import { OfferEntity } from './offer.entity';
import { OfferInterface } from '../../common/shared-types';

@Injectable()
export class OfferService {

  constructor(
    private readonly offerRepository: OfferRepository,
  ) {
  }

  public async create(dto: CreateOfferDto): Promise<OfferInterface> {
    const offerEntity = new OfferEntity(dto);
    return this.offerRepository.create(offerEntity);
  }

  public async getOffers(): Promise<OfferInterface[]> {
    return this.offerRepository.findAll();
  }

  public async getNewOffers(count: number): Promise<OfferInterface[]> {
    return this.offerRepository.findNew(count);
  }

  public async getOffer(id: string): Promise<OfferInterface | null> {
    return this.offerRepository.findById(id);
  }

  public async findByCategoryId(id: string, limit: number): Promise<OfferInterface[]> {
    return this.offerRepository.findByCategoryId(id, limit);
  }

  public async updateOffer(id: string, dto: UpdateOfferDto): Promise<OfferInterface> {
    return Promise.resolve(undefined);
  }

  public async deleteById(id: string): Promise<void> {
   await this.offerRepository.destroy(id);
  }
}
