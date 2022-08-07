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

import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatListModule } from '@angular/material/list';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { MatCardModule } from '@angular/material/card';
import { ExpenseListComponent } from './component/expenst-list/expense-list.component';
import { DateSelectionComponent } from './date-selection/date-selection.component';
import { MatNativeDateModule } from '@angular/material/core';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ExpenseListComponent,
    DateSelectionComponent,
  ],
  imports: [
    BrowserModule,
    MatSliderModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatNativeDateModule,
    MatCardModule,
    MatDatepickerModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      {
        path: 'expense',
        // loadChildren: () =>
        //   import('./component/expenst-list/expense-list.component').then(
        //     (module) => module.ExpenseListComponent
        //   ),
        component: ExpenseListComponent,
        canActivate: [CheckTokenGuard],
      },
      { path: '**', redirectTo: 'login' },
    ]),
    StoreModule.forRoot({}, {}),
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
