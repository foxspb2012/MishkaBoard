import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OffersComponent } from './offers.component';
import { OffersListComponent } from './offers-list/offers-list.component';

const routes: Routes = [
  {
    path: '',
    component: OffersComponent,
    children: [
      {
        path: 'offers-list',
        component: OffersListComponent
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
