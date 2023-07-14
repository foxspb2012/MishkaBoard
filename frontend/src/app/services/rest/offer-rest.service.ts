import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OfferInterface } from '../../models/offers-interface';

@Injectable({
  providedIn: 'root'
})
export class OfferRestService {

  constructor(private http: HttpClient) {
  }

  getOffers(): Observable<OfferInterface[]> {
    return this.http.get<OfferInterface[]>('http://localhost:3333/api/offers');

  }
}
