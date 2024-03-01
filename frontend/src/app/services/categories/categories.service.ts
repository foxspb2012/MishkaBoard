import { Injectable } from '@angular/core';
import { CategoryRestService } from '../rest/category-rest.service';
import { Observable } from 'rxjs';
import { CategoryInterface } from '../../models/category-interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private categoryServiceRest: CategoryRestService) {
  }

  getCategories(): Observable<CategoryInterface[]> {
    return this.categoryServiceRest.getListCategories();
  }

  getAllCategories(): Observable<CategoryInterface[]> {
    return this.categoryServiceRest.getAllCategories();
  }
}
