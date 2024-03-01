import { Component, OnInit } from '@angular/core';
import { OfferInterface } from '../../../models/offers-interface';
import { CategoryInterface } from '../../../models/category-interface';
import { ActivatedRoute, Router } from '@angular/router';
import { OfferService } from '../../../services/offers/offer.service';
import { CategoryService } from '../../../services/categories/categories.service';


@Component({
  selector: 'app-offers-by-category',
  templateUrl: './offers-by-category.component.html',
  styleUrls: ['./offers-by-category.component.scss']
})

export class OffersByCategoryComponent implements OnInit {
  offers: OfferInterface[];
  categories: CategoryInterface[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private offersService: OfferService) {
  }

  ngOnInit(): void {
    const routeIdParam = this.route.snapshot.paramMap.get('id');
    const queryParam = this.route.snapshot.queryParamMap.get('id');

    const paramValueId = routeIdParam || queryParam;
    if (paramValueId) {
      this.offersService.getOffers(paramValueId).subscribe((data: OfferInterface[]): void => {
        this.offers = data;
      });
    }
  }

  goToOfferInfoPage(item: OfferInterface): void {
    this.router.navigate([`/offers/offer/${item.id}`])
  }


}
