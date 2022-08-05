import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { TodosService } from './todos.service';

@Component({
  selector: 'app-add',
  template: `
    <p>
      add new todo!
    </p>
  <form [formGroup]="addForm" (ngSubmit)="addTodo()">
    <input placeholder="title" formControlName="title"/>  
    <input placeholder="description" formControlName="description"/>  
    <button type="submit" [disabled]="!addForm.valid">Add</button>
  </form>
  `,
  styles: [
  ]
})
export class AddComponent implements OnInit {
  addForm!: FormGroup;
  constructor(private fb: FormBuilder, private todoService: TodosService, private userService: UserService, private router: Router) {
    this.addForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    })
  }
  addTodo() {
    this.todoService.addNewTodo({
      ...this.addForm.value,
      completed: false,
      user: {
        user_id: this.userService.getUserState()?.user_id,
        fullname: this.userService.getUserState()?.fullname
      }
    }).subscribe(response => {
      this.router.navigate(['/', 'todos']);
    })
  }

  ngOnInit(): void {
  }

}
