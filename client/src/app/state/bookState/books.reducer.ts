import { createReducer, on } from '@ngrx/store';
import { Book } from 'src/app/interface/book.model';

import { retrieveBookList } from './books.actions';

export const initialState: ReadonlyArray<Book> = [];

export const bookReducer = createReducer(
  initialState,
  on(retrieveBookList, (state, { books }) => books)
);
