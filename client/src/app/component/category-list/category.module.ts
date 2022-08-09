import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryListComponent } from './category-list.component';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CategoryListComponent,
    AddCategoryComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: AddCategoryComponent },
      { path: '', component: CategoryListComponent },
    ]),
  ]
})
export class CategoryModule { }
