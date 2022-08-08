import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { UserService } from './service/user.service';
// import { selectBooks } from './state/bookState/books.selectors';
// import { retrieveBookList, addBook } from './state/bookState/books.actions';
@Component({
  selector: 'app-root',
  template: `
    <mat-toolbar color="primary">
      <button
        mat-icon-button
        class="example-icon"
        aria-label="Example icon-button with menu icon"
        (click)="goHome()"
      >
        <mat-icon>home</mat-icon>
      </button>
      <span>Expense tracker</span>
      <span class="nav-spacer"></span>
      <button
        mat-icon-button
        class="example-icon favorite-icon"
        aria-label="category menu"
        (click)="goCategory()"
        *ngIf="isLoggedIn"
      >
        <mat-icon>receipt</mat-icon>
      </button>
      <button
        *ngIf="isLoggedIn"
        mat-icon-button
        class="example-icon"
        aria-label="profile icon"
        (click)="goProfile()"
      >
        <mat-icon>perm_identity</mat-icon>
      </button>
      <button
        *ngIf="isLoggedIn"
        mat-icon-button
        class="example-icon"
        aria-label="profile icon"
        (click)="logout()"
      >
        <mat-icon>exit_to_app</mat-icon>
      </button>
    </mat-toolbar>

    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.style.scss'],
})
export class AppComponent implements OnDestroy {
  isLoggedIn: boolean = false;
  sub!: Subscription;
  username: string = '';
  constructor(
    private userService: UserService,
    private router: Router,
    private store: Store
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
      this.router.navigate(['/', 'expense']);
    } else {
      this.router.navigate(['/', 'home']);
    }
  }
  goHome() {
    this.router.navigate(['/', 'expense']);
  }
  goCategory() {
    this.router.navigate(['/', 'category']);
  }
  goProfile() {
    this.router.navigate(['/', 'profile']);
  }
  ngOnInit() {}
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/', 'login']);
  }
}
