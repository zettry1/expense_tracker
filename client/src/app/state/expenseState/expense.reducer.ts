import { createReducer, on } from '@ngrx/store';
import Expense from 'src/app/interface/expense.model';

import { retrieveExpenseList, setSearchDate } from './expense.actions';

export const initialState: {
  expenses: Array<Expense>;
  searchDate: string;
} = {
  expenses: [],
  searchDate: new Date().toLocaleDateString(),
};

export const expenseReducer = createReducer(
  initialState,
  on(retrieveExpenseList, (state, { expenses }) => {
    return { ...state, expenses: expenses };
  }),
  on(setSearchDate, (state, { searchDate }) => {
    return { ...state, searchDate: searchDate };
  })
);
