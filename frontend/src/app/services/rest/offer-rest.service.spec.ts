import { TestBed } from '@angular/core/testing';

import { OfferRestService } from './offer-rest.service';

describe('OfferRestService', () => {
  let service: OfferRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfferRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
