import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-profile',
  template: ` <div>Profile info</div>`,
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(userService: UserService) {
    const user = userService.getUserState();
  }

  ngOnInit(): void {}
}
