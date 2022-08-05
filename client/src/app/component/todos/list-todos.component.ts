import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Todo } from './TodoInterface';
import { TodosService } from './todos.service';

@Component({
  selector: 'app-list-todos',
  template: `
  <button (click)="addTodo()">Add New Todo</button>
    <p *ngFor="let todo of list_of_todos" [ngClass]="{cross: todo.completed}">
      <app-todo [data]="todo" [actions]="{deleteTodo: deleteTodo.bind(this),updateCompleted: updateCompleted.bind(this), updateTodo: updateTodo.bind(this)}"></app-todo>
    </p>
  `,
  styles: [`
    .cross {text-decoration: line-through;}
  `]

})
export class ListTodosComponent {
  list_of_todos: Array<Todo> = [];

  constructor(private todoService: TodosService, private router: Router) {
    this.todoService.getTodos().subscribe(
      (response: Array<Todo>) => {
        this.list_of_todos = response;
      }
    );
  }
  deleteTodo(todo_id: string) {
    this.todoService.deleteTodoById(todo_id)
      .subscribe(response => {
        this.list_of_todos = this.list_of_todos.filter(todo => todo._id !== todo_id);
      })
  }
  updateCompleted(todo_id: string, completed: boolean) {
    this.todoService.toggleTodoById(todo_id, completed)
      .subscribe(response => {
        this.list_of_todos = this.list_of_todos.map(todo => {
          if (todo._id === todo_id) {
            todo.completed = completed;
          }
          return todo;
        });
      })
  }
  addTodo() {
    this.router.navigate(['/', 'todos', 'add']);
  }
  updateTodo(todo: Todo) {
    this.router.navigate(['/', 'todos', 'edit', todo._id]);
  }
}
