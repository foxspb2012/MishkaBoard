import { Injectable } from '@angular/core';
import { OfferRestService } from '../rest/offer-rest.service';
import { Observable } from 'rxjs';
import { OfferInterface } from '../../models/offers-interface';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(private offerServiceRest: OfferRestService) {
  }

  getOffers(): Observable<OfferInterface[]> {
    return this.offerServiceRest.getOffers();
  }

  getNewOffers(): Observable<OfferInterface[]> {
    return this.offerServiceRest.getNewOffers();
  }

  getOfferById(id: string): Observable<OfferInterface> {
    return this.offerServiceRest.getOfferById(id);
  }

  createOffer(body: any) {
    return this.offerServiceRest.createOffer(body);
  }
}
