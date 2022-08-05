import { Component, Input, OnInit } from '@angular/core';
import { Todo } from '../../interface/TodoInterface';

@Component({
  selector: 'app-todo',
  template: `
    <div [setBackground]="todo.completed ? 'grey' : ''">
      {{ todo.title }} - {{ todo.timestamp | date: 'short' }}
    </div>
    <button (click)="actions.deleteTodo($any(todo)._id)">Delete</button>
    <button (click)="actions.updateTodo(todo)">Update</button>
    <button
      (click)="actions.updateCompleted($any(todo)._id, true)"
      *ngIf="!todo.completed"
    >
      Mark As Completed
    </button>
    <button
      (click)="actions.updateCompleted($any(todo)._id, false)"
      *ngIf="todo.completed"
    >
      Mark Incomplete
    </button>
  `,
})
export class TodoComponent {
  @Input('data') todo!: Todo;
  @Input() actions!: any;
}
