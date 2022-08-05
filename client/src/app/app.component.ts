import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { GoogleBooksService } from './service/books.service';
import { UserService } from './service/user.service';
import { selectBooks } from './state/bookState/books.selectors';
import { retrieveBookList, addBook } from './state/bookState/books.actions';
@Component({
  selector: 'app-root',
  template: `
    <div *ngIf="isLoggedIn">
      <button (click)="logout()">Logout</button>
      <p>welcome {{ username }}</p>
    </div>
    <h1>Todos App</h1>

    <router-outlet></router-outlet>
    <mat-slider min="1" max="100" step="1" value="50"></mat-slider>

    <h2>Books</h2>
    <app-book-list
      class="book-list"
      [books]="books$ | async"
      (add)="onAdd($event)"
    ></app-book-list>
  `,
})
export class AppComponent implements OnDestroy {
  isLoggedIn: boolean = false;
  sub!: Subscription;
  username: string = '';
  constructor(
    private userService: UserService,
    private router: Router,
    private store: Store,
    private booksService: GoogleBooksService
  ) {
    this.sub = this.userService.userState$.subscribe((userState) => {
      if (userState.token) {
        this.isLoggedIn = true;
        this.username = this.userService.getUserState()?.fullname as string;
      } else {
        this.isLoggedIn = false;
      }
    });

    this.userService.refreshState();

    const userState = this.userService.getUserState();

    if (userState?.user_id) {
      this.router.navigate(['/', 'todos']);
    } else {
      this.router.navigate(['/', 'login']);
    }
  }

  books$ = this.store.select(selectBooks);
  onAdd(bookId: string) {
    this.store.dispatch(addBook({ bookId }));
  }
  ngOnInit() {
    this.booksService
      .getBooks()
      .subscribe((books) => this.store.dispatch(retrieveBookList({ books })));
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/', 'login']);
  }
}
