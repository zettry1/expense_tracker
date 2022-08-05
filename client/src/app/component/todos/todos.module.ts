import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListTodosComponent } from './list-todos.component';
import { TodoComponent } from './todo.component';
import { SetBackgroundDirective } from './set-background.directive';
import { RouterModule } from '@angular/router';
import { AddComponent } from './add.component';
import { EditComponent } from './edit.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ListTodosComponent,
    TodoComponent,
    SetBackgroundDirective,
    AddComponent,
    EditComponent,
  ],
  imports: [
    CommonModule,
    // todos
    RouterModule.forChild([
      { path: '', component: ListTodosComponent },
      { path: 'add', component: AddComponent },
      { path: 'edit/:todo_id', component: EditComponent },
    ]),
    ReactiveFormsModule
  ]
})
export class TodosModule { }
