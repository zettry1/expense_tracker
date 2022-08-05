import { Book } from '../interface/book.model';

export interface AppState {
  books: ReadonlyArray<Book>;
  collection: ReadonlyArray<String>;
}
