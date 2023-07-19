import { Component, OnInit } from '@angular/core';
import { OfferInterface } from '../../../models/offers-interface';
import { ActivatedRoute } from '@angular/router';
import { OfferService } from '../../../services/offers/offer.service';


@Component({
  selector: 'app-offer-item',
  templateUrl: './offer-item.component.html',
  styleUrls: ['./offer-item.component.scss']
})
export class OfferItemComponent implements OnInit {
  offer: OfferInterface | undefined;

  constructor(
    private route: ActivatedRoute,
    private offersService: OfferService
  ) {
  }

  ngOnInit(): void {

    const routeIdParam = this.route.snapshot.paramMap.get('id');
    const queryParam = this.route.snapshot.queryParamMap.get('id');

    const paramValueId = routeIdParam || queryParam;
    if (paramValueId) {

      this.offersService.getOfferById(paramValueId).subscribe((data: OfferInterface): void => {
        this.offer = data;
      });
    }
  }

}
