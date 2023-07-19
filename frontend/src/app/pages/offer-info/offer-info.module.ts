import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { OfferInfoRoutingModule } from './offer-info-routing.module';
import { OfferItemComponent } from './offer-item/offer-item.component';


@NgModule({
  declarations: [
    OfferItemComponent
  ],
  imports: [
    CommonModule,
    OfferInfoRoutingModule,
    NgOptimizedImage
  ]
})
export class OfferInfoModule { }
