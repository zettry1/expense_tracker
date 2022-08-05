import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';

import { LoginComponent } from './component/login/login.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckTokenGuard } from './util/check-token.guard';
import { AttachTokenInterceptor } from './util/attach-token.interceptor';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { bookReducer } from './state/bookState/books.reducer';
import { collectionReducer } from './state/bookState/collections.reducer';
import { BookListComponent } from './component/book-list/book-list.component';
import { MatSliderModule } from '@angular/material/slider';
@NgModule({
  declarations: [AppComponent, LoginComponent, BookListComponent],
  imports: [
    BrowserModule,
    MatSliderModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      {
        path: 'todos',
        loadChildren: () =>
          import('./component/todos/todos.module').then(
            (module) => module.TodosModule
          ),
        canActivate: [CheckTokenGuard],
      },
      { path: '**', redirectTo: 'login' },
    ]),
    StoreModule.forRoot(
      { books: bookReducer, collection: collectionReducer },
      {}
    ),
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AttachTokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
