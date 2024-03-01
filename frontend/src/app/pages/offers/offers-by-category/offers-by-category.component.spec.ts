import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffersByCategoryListComponent } from './offers-by-category.component';

describe('OffersByCategoryListComponent', () => {
  let component: OffersByCategoryListComponent;
  let fixture: ComponentFixture<OffersByCategoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OffersByCategoryListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffersByCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
