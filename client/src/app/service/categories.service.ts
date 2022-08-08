import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from 'src/app/interface/book.model';

@Injectable({ providedIn: 'root' })
export class CategoriesService {
  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get<Array<any>>('http://localhost:3000/categories');
  }

  getCategoryById(id: string) {
    return this.http.get<any>('http://localhost:3000/categories/' + id);
  }
}
