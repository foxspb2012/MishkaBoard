import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OfferItemComponent } from './offer-item/offer-item.component';

const routes: Routes = [
  {
    path:'',
    component: OfferItemComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfferInfoRoutingModule { }
