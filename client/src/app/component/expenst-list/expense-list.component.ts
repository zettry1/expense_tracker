import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Expense from 'src/app/interface/expense.model';
import { ExpenseService } from 'src/app/service/expense.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'expense-list-todos',
  template: `
    <expense-date-selection></expense-date-selection>
    <div class="mat-elevation-z8">
      <table mat-table [dataSource]="list_of_expenses">
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef>Name</th>
          <td mat-cell *matCellDef="let element">{{ element.name }}</td>
        </ng-container>
        <ng-container matColumnDef="type">
          <th mat-header-cell *matHeaderCellDef>Type</th>
          <td mat-cell *matCellDef="let element">{{ element.type }}</td>
        </ng-container>

        <ng-container matColumnDef="description">
          <th mat-header-cell *matHeaderCellDef>Description</th>
          <td mat-cell *matCellDef="let element">{{ element.description }}</td>
        </ng-container>

        <ng-container matColumnDef="total">
          <th mat-header-cell *matHeaderCellDef>Total</th>
          <td mat-cell *matCellDef="let element">{{ element.total }}</td>
        </ng-container>

        <ng-container matColumnDef="date">
          <th mat-header-cell *matHeaderCellDef>Date</th>
          <td mat-cell *matCellDef="let element">{{ element.date }}</td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr
          mat-row
          *matRowDef="let row; columns: displayedColumns"
          (click)="editExpense(row)"
        ></tr>
      </table>

      <mat-paginator
        [pageSizeOptions]="[5, 10, 20]"
        showFirstLastButtons
        aria-label="Select page of periodic elements"
      >
      </mat-paginator>
    </div>
  `,
  styleUrls: ['./expense-list.component.scss'],
})
export class ExpenseListComponent {
  list_of_expenses: Array<Expense> = [];
  displayedColumns: string[] = ['name', 'type', 'description', 'total', 'date'];
  dataSource = new MatTableDataSource<Expense>(this.list_of_expenses);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  constructor(private expenseService: ExpenseService, private router: Router) {
    this.expenseService.getExpenses().subscribe((response: Array<Expense>) => {
      this.list_of_expenses = response;
      this.dataSource.paginator = this.paginator;
    });
  }

  deleteTodo(todo_id: string) {
    this.expenseService.deleteExpenseById(todo_id).subscribe((response) => {
      this.list_of_expenses = this.list_of_expenses.filter(
        (todo) => todo._id !== todo_id
      );
    });
  }

  editExpense(expense: Expense) {
    console.log('expense,', expense);
    this.router.navigate(['/', 'expense', 'edit', expense._id]);
  }
}
