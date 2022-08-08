import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Expense from '../interface/expense.model';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  constructor(private http: HttpClient) {}

  getExpenses() {
    return this.http.get<Array<any>>('http://localhost:3000/expense');
  }

  getExpenseById(expense_id: string) {
    return this.http.get<Expense>(
      'http://localhost:3000/expense/' + expense_id
    );
  }

  deleteExpenseById(expense_id: string) {
    return this.http.delete('http://localhost:3000/expense/' + expense_id);
  }

  addNewExpense(expense: Expense) {
    return this.http.post('http://localhost:3000/expense', expense);
  }

  updateExpense(expense: Expense) {
    return this.http.patch(
      'http://localhost:3000/expense/' + expense._id,
      expense
    );
  }
}
