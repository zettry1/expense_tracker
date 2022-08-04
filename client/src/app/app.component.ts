import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  template: `
  <div *ngIf="isLoggedIn">
    <button (click)="logout()" >Logout</button>
    <p>welcome {{username}}</p>
  </div>
    <h1>Todos App</h1>
    <router-outlet></router-outlet>
    
  `,
})
export class AppComponent implements OnDestroy {
  isLoggedIn: boolean = false;
  sub!: Subscription;
  username: string = ''
  constructor(private userService: UserService, private router: Router) {
    this.sub = this.userService.userState$.subscribe(userState => {
      if (userState.token) {
        this.isLoggedIn = true;
        this.username = this.userService.getUserState()?.fullname as string;
      } else {
        this.isLoggedIn = false;
      }
    })

    this.userService.refreshState();

    const userState = this.userService.getUserState();

    if (userState?.user_id) {
      this.router.navigate(['/', 'todos']);
    } else {
      this.router.navigate(['/', 'login']);
    }
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/', 'login']);
  }

}
