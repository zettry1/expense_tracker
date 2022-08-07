import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  loginForm!: FormGroup;
  constructor( private fb: FormBuilder, private userService: UserService, private router: Router ) {
    this.loginForm = this.fb.group({
      email:['ttsogt@miu.edu'],
      password:['123456']
    })
   }

   login(): void {
    this.userService.login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(response => {
        // set the state
        this.userService.userState$.next(response);
        this.userService.persistState();
        this.router.navigate(['/', 'todos']);
      })
  }
}
