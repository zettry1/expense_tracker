import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Expense from 'src/app/interface/expense.model';
import { ExpenseService } from 'src/app/service/expense.service';

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
  list_of_expenses: Array<Expense> = [];
  messages: any[] = [
    { from: 'aa', content: 'cont', subject: 'subj' },
    { from: 'aa', content: 'cont', subject: 'subj' },
  ];
  constructor(private expenseService: ExpenseService, private router: Router) {
    this.expenseService.getExpenses().subscribe((response: Array<Expense>) => {
      this.list_of_expenses = response;
    });
  }
  deleteTodo(todo_id: string) {
    this.expenseService.deleteExpenseById(todo_id).subscribe((response) => {
      this.list_of_expenses = this.list_of_expenses.filter(
        (todo) => todo._id !== todo_id
      );
    });
  }

  addTodo() {
    this.router.navigate(['/', 'expense', 'add']);
  }
  updateTodo(expense: Expense) {
    this.router.navigate(['/', 'expense', 'edit', expense._id]);
  }
}
