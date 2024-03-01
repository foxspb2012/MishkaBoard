import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { OffersRoutingModule } from './offers-routing.module';
import { OffersComponent } from './offers.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { OffersListComponent } from './offers-list/offers-list.component';
import { MenubarModule } from 'primeng/menubar';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { OfferCreateComponent } from './offer-create/offer-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { OffersByCategoryComponent } from './offers-by-category/offers-by-category.component';

@NgModule({
  declarations: [
    OffersComponent,
    HeaderComponent,
    FooterComponent,
    OffersListComponent,
    CategoriesListComponent,
    OfferCreateComponent
  ],
    imports: [
        CommonModule,
        OffersRoutingModule,
        MenubarModule,
        NgOptimizedImage,
        ReactiveFormsModule
    ]
})
export class OffersModule { }
