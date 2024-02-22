import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoryInterface } from '../../models/category-interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryRestService {

  constructor(private http: HttpClient) {
  }

  getListCategories(): Observable<CategoryInterface[]> {
    return this.http.get<CategoryInterface[]>('http://localhost:3333/api/categories/list');
  }
}
