import { Component, OnInit } from '@angular/core';
import { OfferService } from '../../../services/offers/offer.service';
import { OfferInterface } from '../../../models/offers-interface';

@Component({
  selector: 'app-offers-list',
  templateUrl: './offers-list.component.html',
  styleUrls: ['./offers-list.component.scss']
})
export class OffersListComponent implements OnInit {
  offers: OfferInterface[];

  constructor(private offerService: OfferService) {
  }

  ngOnInit(): void {
    this.offerService.getOffers().subscribe((data: OfferInterface[]): void => {
      this.offers = data;
    });
  }

}
