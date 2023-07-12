import { Module } from '@nestjs/common';
import { OfferService } from './offer.service';
import { MongooseModule } from '@nestjs/mongoose';
import { OfferController } from './offer.controller';
import { OfferRepository } from './offer.repository';
import { OfferModel, OfferSchema } from './offer.model';

@Module({
  imports: [MongooseModule.forFeature([
    {name: OfferModel.name, schema: OfferSchema}
  ])],
  controllers: [OfferController],
  providers: [OfferService, OfferRepository],
  exports: [OfferRepository]
})
export class OfferModule {}
