import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ExpenseService } from 'src/app/service/expense.service';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-add-expense',
  template: `
    <mat-card class="container">
      <form
        [formGroup]="form"
        class="form-wrapper"
        (ngSubmit)="saveDetails(form)"
      >
        <mat-form-field class="example-full-width" appearance="outline">
          <mat-label>Choose a date</mat-label>
          <input
            matInput
            [matDatepicker]="picker"
            formControlName="expense_date"
          />
          <mat-datepicker-toggle matSuffix [for]="picker">
            <mat-icon matDatepickerToggleIcon>keyboard_arrow_down</mat-icon>
          </mat-datepicker-toggle>
          <mat-datepicker #picker></mat-datepicker>
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Select type</mat-label>
          <mat-select formControlName="type">
            <mat-option value="expense">Expense</mat-option>
            <mat-option value="income">Income</mat-option>
          </mat-select>
          <mat-hint align="end">Select expense type^</mat-hint>
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Name</mat-label>
          <input
            matInput
            maxlength="15"
            inputmode="tel"
            placeholder="Type name"
            formControlName="name"
            #nameInput
          />
          <mat-hint
            >Mini character 10: {{ nameInput.value.length }}/10</mat-hint
          >
          <mat-error>Name is required</mat-error>
          <mat-error *ngIf="form.controls['name'].errors?.['minlength']">
            Please enter more than 10 character
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Description:</mat-label>
          <textarea
            matInput
            placeholder="description"
            formControlName="description"
          ></textarea>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Amount:</mat-label>
          <input
            matInput
            formControlName="total"
            type="number"
            placeholder="amount"
          />
          <mat-icon matSuffix>fa-dollar-sign</mat-icon>

          <mat-error *ngIf="form.controls['total'].errors?.['required']"
            >Amount is required</mat-error
          >
        </mat-form-field>
        <div mat-dialog-actions align="end">
          <button
            mat-raised-button
            color="primary"
            type="submit"
            [disabled]="!form.valid"
          >
            Add new expense
          </button>
        </div>
      </form>
    </mat-card>
  `,

  styleUrls: ['./add-expense.component.scss'],
})
export class AddExpenseComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private expenseService: ExpenseService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      expense_date: [new Date(), [Validators.required]],
      name: [null, [Validators.required]],
      type: ['expense', [Validators.required]],
      description: [null],
      total: [0.0, [Validators.required, Validators.required]],
    });
  }

  saveDetails(form: any) {
    this.expenseService
      .addNewExpense({
        ...form.value,
        date: formatDate(form.value.expense_date, 'yyyy-MM-dd', 'en-US'),

        user: {
          user_id: this.userService.getUserState()?.user_id,
          fullname: this.userService.getUserState()?.fullname,
        },
      })
      .subscribe((response) => {
        this.router.navigate(['/', 'expense']);
      });
  }
}
