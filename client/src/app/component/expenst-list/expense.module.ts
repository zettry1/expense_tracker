import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseListComponent } from './expense-list.component';
import { RouterModule } from '@angular/router';
import { AddExpenseComponent } from '../add-expense/add-expense.component';
import { EditExpenseComponent } from '../edit-expense/edit-expense.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DateSelectionComponent } from 'src/app/date-selection/date-selection.component';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    ExpenseListComponent,
    AddExpenseComponent,
    DateSelectionComponent,
    EditExpenseComponent,
  ],
  imports: [
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    CommonModule,
    MatCardModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatPaginatorModule,
    MatTableModule,
    // expenes
    RouterModule.forChild([
      { path: '', component: ExpenseListComponent },
      { path: 'add', component: AddExpenseComponent },
      { path: 'edit/:id', component: EditExpenseComponent },
    ]),

    ReactiveFormsModule,
  ],
})
export class ExpenseModule {}
