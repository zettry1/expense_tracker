import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ExpenseService } from 'src/app/service/expense.service';
import { Todo } from '../../interface/TodoInterface';
import { TodosService } from '../todos/todos.service';

@Component({
  selector: 'expense-list-todos',
  template: `
    <mat-list>
      <mat-list-item *ngFor="let message of messages">
        <mat-icon matListIcon>folder</mat-icon>
        <h3 matLine>{{ message.from }}</h3>
        <p matLine>
          <span> {{ message.subject }} </span>
          <span class="demo-2"> -- {{ message.content }} </span>
        </p>
      </mat-list-item>
    </mat-list>
  `,
  styles: [
    `
      .cross {
        text-decoration: line-through;
      }
    `,
  ],
})
export class ExpenseListComponent {
  list_of_todos: Array<Todo> = [];

  constructor(private expenseService: ExpenseService, private router: Router) {
    this.expenseService.getExpenses().subscribe((response: Array<Todo>) => {
      this.list_of_todos = response;
    });
  }
  deleteTodo(todo_id: string) {
    this.expenseService.deleteTodoById(todo_id).subscribe((response) => {
      this.list_of_todos = this.list_of_todos.filter(
        (todo) => todo._id !== todo_id
      );
    });
  }
  updateCompleted(todo_id: string, completed: boolean) {
    this.expenseService
      .toggleTodoById(todo_id, completed)
      .subscribe((response) => {
        this.list_of_todos = this.list_of_todos.map((todo) => {
          if (todo._id === todo_id) {
            todo.completed = completed;
          }
          return todo;
        });
      });
  }
  addTodo() {
    this.router.navigate(['/', 'todos', 'add']);
  }
  updateTodo(todo: Todo) {
    this.router.navigate(['/', 'todos', 'edit', todo._id]);
  }
}
