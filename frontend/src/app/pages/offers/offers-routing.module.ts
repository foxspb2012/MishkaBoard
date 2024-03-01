import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OffersComponent } from './offers.component';
import { OffersListComponent } from './offers-list/offers-list.component';
import { OfferCreateComponent } from './offer-create/offer-create.component';

const routes: Routes = [
  {
    path: '',
    component: OffersComponent,
    children: [
      {
        path: 'offers-list',
        component: OffersListComponent
      },
      {
        path: 'offers-by-category/:id',
        loadChildren:() => import('./offers-by-category/offers-by-category.module').then(m=>m.OffersByCategoryInfoModule)
      },
      {
        path: 'offer-create',
        component: OfferCreateComponent
      },
      {
        path: 'offer/:id',
        loadChildren:() => import('../offer-info/offer-info.module').then(m=>m.OfferInfoModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OffersRoutingModule {
}
