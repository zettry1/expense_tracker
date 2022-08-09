import { createAction, props } from '@ngrx/store';
import Expense from '../../interface/expense.model';

export const addExpense = createAction(
  '[Expense List] Add Expense',
  props<{ expenseId: string }>()
);

export const removeExpense = createAction(
  '[Expense Collection] Remove Expense',
  props<{ expenseId: string }>()
);

export const retrieveExpenseList = createAction(
  '[Expense List/API] Retrieve Expenses ',
  props<{ expenses: Array<Expense> }>()
);
export const setSearchDate = createAction(
  '[Expense List/API] Set search date ',
  props<{ searchDate: string }>()
);
