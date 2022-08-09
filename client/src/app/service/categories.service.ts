import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { of, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from '../interface/category';

@Injectable({ providedIn: 'root' })
export class CategoriesService {
  private categories: Category[] = [];
  private categories$ = new Subject<Category[]>();
  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get<Array<any>>('http://localhost:3000/category/');
    // return this.http
    //   .get<{ categs: Category[] }>('http://localhost:3000/category/')
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
    return this.http.get<any>('http://localhost:3000/categories/' + id);
  }

  addNewCateegory(name: string, image: File): void {
    // return this.http.post('http://localhost:3000/categories/', category);
      const categoryData = new FormData();
      categoryData.append("name", name);
      categoryData.append("image", image, name);
      this.http
        .post<{ category: Category }>('http://localhost:3000/category/', categoryData)
        .subscribe((categoryData) => {
          const category: Category = {
            name: name,
            imagePath: categoryData.category.imagePath,
          };
          console.log(category);
          this.categories.push(category);
          this.categories$.next(this.categories);
        });
  }
}
