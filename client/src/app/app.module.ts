import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';

import { LoginComponent } from './component/login/login.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
// angular material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { StoreModule } from '@ngrx/store';

import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatListModule } from '@angular/material/list';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { MatCardModule } from '@angular/material/card';
import { ExpenseListComponent } from './component/expenst-list/expense-list.component';
import { DateSelectionComponent } from './date-selection/date-selection.component';
import { MatNativeDateModule } from '@angular/material/core';
import { CheckTokenGuard } from './util/check-token.guard';
import { AttachTokenInterceptor } from './util/attach-token.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddExpenseComponent } from './component/add-expense/add-expense.component';
import { EditExpenseComponent } from './component/edit-expense/edit-expense.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,

    ExpenseListComponent,
    DateSelectionComponent,
    AddExpenseComponent,
    EditExpenseComponent,
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
    StoreModule.forRoot({}, {}),
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent, pathMatch: 'full' },
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

    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatSelectModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AttachTokenInterceptor,
      multi: true,
    },
    { provide: MatFormFieldModule, useValue: { appearance: 'fill' } },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
