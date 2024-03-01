import { Component, OnInit } from '@angular/core';
import { OfferService } from '../../../services/offers/offer.service';
import { OfferInterface } from '../../../models/offers-interface';
import { CategoryService } from '../../../services/categories/categories.service';
import { CategoryInterface} from '../../../models/category-interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offers-list',
  templateUrl: './offers-list.component.html',
  styleUrls: ['./offers-list.component.scss']
})
export class OffersListComponent implements OnInit {
  offers: OfferInterface[];
  newOffers: OfferInterface[];
  categories: CategoryInterface[];

    constructor(private router: Router,
              private offerService: OfferService,
              private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.offerService.getNewOffers().subscribe((data: OfferInterface[]): void => {
      this.newOffers = data;
    });

    this.offerService.getOffers().subscribe((data: OfferInterface[]): void => {
      this.offers = data;
    });

    this.categoryService.getAllCategories().subscribe((data: CategoryInterface[]): void => {
      this.categories = data;
    });
  }

  goToOfferInfoPage(item: OfferInterface): void {
    this.router.navigate([`/offers/offer/${item.id}`])
  }

  // goToCategoryInfoPage(item: CategoryInterface): void {
  //   this.router.navigate([`/offers/${item.id}`])
  // }
}
