import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { OffersByCategoryInfoRoutingModule } from './offers-by-category-routing.module';
import { OffersByCategoryComponent } from './offers-by-category.component';

@NgModule({
  declarations: [
    OffersByCategoryComponent
  ],
  imports: [
    CommonModule,
    OffersByCategoryInfoRoutingModule,
    NgOptimizedImage
  ]
})
export class OffersByCategoryInfoModule { }
