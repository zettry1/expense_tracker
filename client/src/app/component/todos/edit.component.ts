import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap, pipe } from 'rxjs';
import { Todo } from './TodoInterface';
import { TodosService } from './todos.service';

@Component({
  selector: 'app-edit',
  template: `
  <form [formGroup]="editForm" (ngSubmit)="editTodo()">
    <input placeholder="title" formControlName="title"/>  
    <input placeholder="description" formControlName="description"/>  
    <button type="submit" [disabled]="!editForm.valid">Save</button>
  </form>
  `,
  styles: [
  ]
})
export class EditComponent implements OnInit {
  todo!: Todo;
  editForm!: FormGroup;
  constructor(
    private ar: ActivatedRoute,
    private todoService: TodosService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.ar.paramMap
      .pipe(
        mergeMap((params: any) => this.todoService.getTodoById(params.get('todo_id')))
      )
      .subscribe(res => {
        // console.log(res)
        this.todo = res;
        this.editForm.get('title')?.patchValue(this.todo.title);
        this.editForm.get('description')?.patchValue(this.todo.description);
      })

    this.editForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    })
  }
  editTodo() {
    this.todoService.updateTodo({
      ...this.todo,
      ...this.editForm.value,
    }).subscribe(response => {
      this.router.navigate(['/', 'todos']);
    })
  }
  ngOnInit(): void {
  }

}
