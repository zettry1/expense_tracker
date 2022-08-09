import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

import { Category } from '../interface/category';

import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CategoriesService {
  private categories: Category[] = [];
  private categories$ = new Subject<Category[]>();
  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get<Array<any>>(`${environment.apiURL}category/`);
    // return this.http
    //   .get<{ categs: Category[] }>(`${e.apiURL}`/category/')
    //   .pipe(
    //     map((categData) => {
    //       return categData.categs;
    //     })
    //   )
    //   .subscribe((categories) => {
    //     this.categories = categories;
    //     this.categories$.next(this.categories);
    //   });
  }

  getCategoriesStream() {
    return this.categories$.asObservable();
  }

  getCategoryById(id: string) {
    return this.http.get<any>(`${environment.apiURL}categories/` + id);
  }

  addNewCateegory(name: string, image: File): void {
    // return this.http.post(`${e.apiURL}`/categories/', category);
    const categoryData = new FormData();
    categoryData.append('name', name);
    categoryData.append('image', image, name);
    this.http
      .post<{ category: Category }>(
        `${environment.apiURL}category/`,
        categoryData
      )
      .subscribe((categoryData) => {
        const category: Category = {
          name: name,
          imagePath: categoryData.category.imagePath,
        };
        this.categories.push(category);
        this.categories$.next(this.categories);
      });
  }
}
