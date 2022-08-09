import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/interface/category';
import { CategoriesService } from 'src/app/service/categories.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit, OnDestroy{
  categories : Array<Category> = [];
  private categorySubscription!: Subscription;

  constructor(private categoriesService: CategoriesService) {
    // this.categoriesService.getCategories().subscribe((response : Array<Category>) => {
    //   this.categories = response;
    // })
  }

  ngOnInit(): void {
    this.categoriesService.getCategories()
      .subscribe((categs: Array<Category>) => {
        this.categories = categs;
      });
  }

  ngOnDestroy() {
    this.categorySubscription.unsubscribe();
  }
}
