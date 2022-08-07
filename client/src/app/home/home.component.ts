import { Component, OnDestroy } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnDestroy {
  isLoggedIn: boolean = false;
  sub!: Subscription;
  username: string = '';
  title: string = ''
  constructor(private userService: UserService, private router: Router) {
    this.sub = this.userService.userState$.subscribe(userState => {
      this.title = 'Expense Tracker App'
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
      this.router.navigate(['/', 'home']);
    }
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/', 'home']);
  }

}
