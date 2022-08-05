import { Book } from './book.model';

export interface AppState {
  books: ReadonlyArray<Book>;
  collection: ReadonlyArray<String>;
}
