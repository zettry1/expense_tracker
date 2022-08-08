import { createReducer, on } from '@ngrx/store';
import Expense from 'src/app/interface/expense.model';

import { retrieveExpenseList } from './expense.actions';

export const initialState: ReadonlyArray<Expense> = [];

export const expenseReducer = createReducer(
  initialState,
  on(retrieveExpenseList, (state, { Expenses }) => Expenses)
);
