import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/interface/category';
import { CategoriesService } from 'src/app/service/categories.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent {
  @Input() categories: Array<Category> = [];

  private categorySubscription!: Subscription;
  constructor(private categoriesService: CategoriesService) {}
}
