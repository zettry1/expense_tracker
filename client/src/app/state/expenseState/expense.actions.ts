import { createAction, props } from '@ngrx/store';
import Expense from '../../interface/expense.model';

export const addExpense = createAction(
  '[Expense List] Add Expense',
  props<{ ExpenseId: string }>()
);

export const removeExpense = createAction(
  '[Expense Collection] Remove Expense',
  props<{ ExpenseId: string }>()
);

export const retrieveExpenseList = createAction(
  '[Expense List/API] Retrieve Expenses ',
  props<{ Expenses: ReadonlyArray<Expense> }>()
);
