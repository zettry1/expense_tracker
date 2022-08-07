import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';

const routes: Routes = [
  //  { path: 'signup',
  //   // component: SignupComponent,
  //   pathMatch : 'full'
  // },

  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
