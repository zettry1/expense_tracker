import { Component, OnInit } from '@angular/core';
import { Category } from '../../interface/category';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { CategoriesService } from 'src/app/service/categories.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  form!:FormGroup;
  category!: Category;
  imageData!: string;
  private router!: Router;

  constructor( private categoryService : CategoriesService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name : new FormControl(null),
      image: new FormControl(null),
    })
  }

  saveData() {
    console.log('save category');
    this.categoryService.addNewCateegory(this.form.value.name, this.form.value.image);
    this.form.reset();
    this.imageData = '';
    // this.router.navigate(['/', 'category']);
  }

  onFileSelect(event: Event) {
    console.log('something selected');
    const inputFiles = (event.target as HTMLInputElement).files;
    if (null !== inputFiles) {
      const file = inputFiles[0];
      this.form.patchValue({ image : file});
      const allowedMimeTypes = ["image/png", "image/jpg", "image/jpeg"];
      if (file && allowedMimeTypes.includes(file.type)) {
        const reader = new FileReader();
        reader.onload = () => {
          this.imageData = reader.result as string;
        };
        reader.readAsDataURL(file);
      }
    }
  }

}
