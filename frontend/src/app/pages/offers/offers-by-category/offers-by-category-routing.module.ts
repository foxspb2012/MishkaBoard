import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OffersByCategoryComponent } from './offers-by-category.component';

const routes: Routes = [
  {
    path:'',
    component: OffersByCategoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OffersByCategoryInfoRoutingModule { }
