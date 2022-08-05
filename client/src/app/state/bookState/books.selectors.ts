import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Book } from 'src/app/interface/book.model';

export const selectBooks = createFeatureSelector<ReadonlyArray<Book>>('books');
export const sellectCollectionState =
  createFeatureSelector<ReadonlyArray<string>>('collection');

export const selectBookCollection = createSelector(
  selectBooks,
  sellectCollectionState,
  (books, collection) => {
    return collection.map((id) => books.find((book) => book.id === id));
  }
);
