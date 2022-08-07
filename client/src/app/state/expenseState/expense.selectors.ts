import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Book } from 'src/app/interface/book.model';
import Expense from 'src/app/interface/expense.model';

export const selectExpenses =
  createFeatureSelector<ReadonlyArray<Expense>>('expenses');

export const selectBookCollection = createSelector(
  selectExpenses,

  (expenses) => {
    return selectExpenses.map((id) =>
      expenses.find((expense) => expense._id === id)
    );
  }
);
