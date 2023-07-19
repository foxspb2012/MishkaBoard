import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OfferService } from '../../../services/offers/offer.service';
import { UserService } from '../../../services/user/user.service';
import { UserServiceInterface } from '../../../models/users-interface';

@Component({
  selector: 'app-offer-create',
  templateUrl: './offer-create.component.html',
  styleUrls: ['./offer-create.component.scss']
})
export class OfferCreateComponent implements OnInit {
  userId: string;
  offerForm: FormGroup;

  constructor( private offerService: OfferService,
              private userService: UserService,
              private router: Router,) {
  }

  ngOnInit(): void {
    this.userId = this.userService.getUserId();

    this.offerForm = new FormGroup({
      title: new FormControl('', {validators: Validators.required}),
      description: new FormControl('', [Validators.required, Validators.minLength(20)]),
      categories: new FormControl(),
      price: new FormControl(),
      type: new FormControl(),
      image: new FormControl(),
      userId: new FormControl(this.userId),
    });
  }

  createOffer(): void {
    const tourDataRow = this.offerForm.getRawValue();
    let formParams = new FormData();
    if (typeof tourDataRow === "object") {
      for (let prop in tourDataRow) {
        formParams.append(prop, tourDataRow[prop]);
      }
    }
    this.offerService.createOffer(formParams).subscribe(() => {
      this.router.navigate(['offers/offers-list']);
    })

  }

  selectFile(evt: any): void {
    if (evt.target.files.length > 0) {
      const file = evt.target.files[0];
      this.offerForm.patchValue({
        image: file,
      })
    }
  }
}
