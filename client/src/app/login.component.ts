// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup } from '@angular/forms';
// import { Router } from '@angular/router';
// import { UserService } from './user.service';

// @Component({
//   selector: 'app-login',
//   template: `
//     <p>
//       login works!
//     </p>

//     <form [formGroup]="loginForm" (ngSubmit)="login()">
//     <input placeholder="email" formControlName="email"/>
//     <input placeholder="password" formControlName="password"/>
//     <button type="submit">Login</button>
//   </form>
//   `,
//   styles: [
//   ]
// })
// export class LoginComponent {
//   loginForm!: FormGroup;
//   constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
//     this.loginForm = this.fb.group({
//       email: ['ttsogt@miu.edu'],
//       password: ['123456']
//     })
//   }

//   login(): void {
//     this.userService.login(this.loginForm.value.email, this.loginForm.value.password)
//       .subscribe(response => {
//         // set the state
//         this.userService.userState$.next(response);
//         this.userService.persistState();
//         this.router.navigate(['/', 'todos']);
//         // console.log(this.userService.getUserState())
//       })
//   }

// }
