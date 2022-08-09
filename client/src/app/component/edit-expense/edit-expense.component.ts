import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ExpenseService } from 'src/app/service/expense.service';
import { Router, ActivatedRoute } from '@angular/router';
import { mergeMap } from 'rxjs';
import Expense from 'src/app/interface/expense.model';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-edit-expense',
  template: `
    <mat-card class="container">
      <form [formGroup]="form" class="form-wrapper" (ngSubmit)="editTodo()">
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
        <div mat-dialog-actions>
          <button
            mat-raised-button
            color="primary"
            type="submit"
            class="btn-update"
            [disabled]="!form.valid"
          >
            update
          </button>

          <button
            (click)="deleteExpense()"
            mat-raised-button
            mat-button
            color="warn"
            type="submit"
          >
            delete
          </button>
        </div>
      </form>
    </mat-card>
  `,
  styleUrls: ['./edit-expense.component.scss'],
})
export class EditExpenseComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  curExpense!: Expense;
  constructor(
    private ar: ActivatedRoute,
    private expenseService: ExpenseService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.ar.paramMap
      .pipe(
        mergeMap((params: any) =>
          this.expenseService.getExpenseById(params.get('id'))
        )
      )
      .subscribe((res) => {
        console.log(res);
        this.curExpense = res;
        this.form.get('name')?.patchValue(this.curExpense.name);
        this.form.get('type')?.patchValue(this.curExpense.type);
        this.form.get('description')?.patchValue(this.curExpense.description);
        this.form.get('total')?.patchValue(this.curExpense.total);
        this.form.get('date')?.patchValue(this.curExpense.date);
      });

    this.form = this.fb.group({
      expense_date: [new Date(), [Validators.required]],
      name: [null, [Validators.required]],
      type: ['expense', [Validators.required]],
      description: [null],
      total: [0.0, [Validators.required, Validators.required]],
    });
  }
  editTodo() {
    this.expenseService
      .updateExpense({
        ...this.curExpense,
        ...this.form.value,
        date: formatDate(this.form.value.expense_date, 'yyyy-MM-dd', 'en-US'),
      })
      .subscribe((response) => {
        console.log('response', response);
        this.router.navigate(['/', 'expense']);
      });
  }
  deleteExpense() {
    this.expenseService
      .deleteExpenseById(this.curExpense._id)
      .subscribe((response) => {
        this.router.navigate(['/', 'expense']);
      });
  }
  ngOnInit(): void {}
}
