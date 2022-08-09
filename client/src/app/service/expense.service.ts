import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Expense from '../interface/expense.model';
import { UserService } from './user.service';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  constructor(private http: HttpClient, private userService: UserService) {}
  getExpenses(searchDate: string) {
    return this.http.get<Array<Expense>>(
      `${environment.apiURL}expense/search`,
      {
        params: {
          date: searchDate,
        },
      }
    );
  }

  getExpenseById(expense_id: string) {
    return this.http.get<Expense>(`${environment.apiURL}expense/` + expense_id);
  }

  deleteExpenseById(expense_id: string) {
    return this.http.delete(`${environment.apiURL}expense/` + expense_id);
  }

  addNewExpense(expense: Expense) {
    return this.http.post(`${environment.apiURL}expense`, expense);
  }

  updateExpense(expense: Expense) {
    return this.http.patch(
      `${environment.apiURL}expense/` + expense._id,
      expense
    );
  }
}
