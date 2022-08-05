import { createAction, props } from '@ngrx/store';
import { Book } from '../../interface/book.model';

export const addBook = createAction(
  '[Book List] Add Book',
  props<{ bookId: string }>()
);

export const removeBook = createAction(
  '[Book Collection] Remove Book',
  props<{ bookId: string }>()
);

export const retrieveBookList = createAction(
  '[Book List/API] Retrieve Books ',
  props<{ books: ReadonlyArray<Book> }>()
);
