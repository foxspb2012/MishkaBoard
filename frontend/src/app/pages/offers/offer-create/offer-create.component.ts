import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OfferService } from '../../../services/offers/offer.service';
import { UserService } from '../../../services/user/user.service';
import { LoadScriptService } from '../../../services/load-script/load-script.service';
import { CategoryService } from '../../../services/categories/categories.service';
import { CategoryInterface } from '../../../models/category-interface';

@Component({
  selector: 'app-offer-create',
  templateUrl: './offer-create.component.html',
  styleUrls: ['./offer-create.component.scss']
})
export class OfferCreateComponent implements OnInit, AfterViewInit {
  userId: string;
  offerForm: FormGroup;
  categories: CategoryInterface[];

  constructor(private loadScript: LoadScriptService,
              private offerService: OfferService,
              private categoryService: CategoryService,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {

    this.categoryService.getCategories().subscribe((data: CategoryInterface[]): void => {
      this.categories = data;
    });


    this.userId = this.userService.getUserId();

    this.offerForm = new FormGroup({
      title: new FormControl('', {validators: Validators.required}),
      description: new FormControl('', [Validators.required, Validators.minLength(20)]),
      categories: new FormControl('', {validators: Validators.required}),
      price: new FormControl('', {validators: Validators.required}),
      type: new FormControl('', {validators: Validators.required}),
      image: new FormControl('', {validators: Validators.required}),
      userId: new FormControl(this.userId),
    });
  }

  ngAfterViewInit(): void {
    this.loadScript.loadScript('/assets/js/main.js').subscribe(() => {
    });

    this.loadScript.loadScript('/assets/js/vendor.js').subscribe(() => {
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

      const readFilePhoto = function (file: Blob) {

        const signUpAvatar = document.querySelector('.js-preview');
        const signUpAvatarContainer = document.querySelector('.js-preview-container');

        const reader = new FileReader();
        reader.addEventListener('load', function () {
          const image = document.createElement('img');
          if (typeof reader.result === "string") {
            image.src = reader.result;
          }
          if (signUpAvatar) {
            signUpAvatar.innerHTML = '';
            signUpAvatar.appendChild(image);
          }

          if (signUpAvatarContainer) {
            signUpAvatarContainer.classList.add('uploaded');
          }

        });
        reader.readAsDataURL(file);
      };
      readFilePhoto(file);
    }
  }
}
