import { createFeatureSelector, createSelector } from '@ngrx/store';
import Expense from 'src/app/interface/expense.model';

export const selectExpenses =
  createFeatureSelector<ReadonlyArray<Expense>>('expenses');
export const sellectCollectionState =
  createFeatureSelector<ReadonlyArray<string>>('collection');

export const selectBookCollection = createSelector(
  selectExpenses,
  sellectCollectionState,
  (expenses, collection) => {
    return collection.map((id) =>
      expenses.find((expense) => expense._id === id)
    );
  }
);
