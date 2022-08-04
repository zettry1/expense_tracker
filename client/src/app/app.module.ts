import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';

import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckTokenGuard } from './check-token.guard';
import { AttachTokenInterceptor } from './attach-token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      {
        path: 'todos',
        loadChildren: () => import('./todos/todos.module')
          .then(module => module.TodosModule),
        canActivate: [CheckTokenGuard]
      },
      { path: '**', redirectTo: 'login' }
    ])
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AttachTokenInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
