import { createFeatureSelector, createSelector } from '@ngrx/store';
import Expense from 'src/app/interface/expense.model';
import { initialState } from './expense.reducer';
export const selectExpenses =
  createFeatureSelector<ReadonlyArray<Expense>>('expenses');

export const expenseState =
  createFeatureSelector<typeof initialState>('expenseState');

export const selectBookCollection = createSelector(
  selectExpenses,
  (expenses) => {
    return expenses;
  }
);
export const selectSearchDate = createSelector(expenseState, (state) => {
  return state.searchDate;
});
