import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { formatDate } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectSearchDate } from '../state/expenseState/expense.selectors';
import { setSearchDate } from '../state/expenseState/expense.actions';
@Component({
  selector: 'expense-date-selection',
  template: ` <div class="calendar-wrapper">
    <mat-card class="calendar-card">
      <mat-calendar
        (selectedChange)="_onSelectedChange($event)"
        [selected]="selectedDate"
      ></mat-calendar>
    </mat-card>
    <p>Selected date: {{ selectedDate }}</p>

    <div>searchDate: {{ expenseState$ | async }}</div>
  </div>`,
  styleUrls: ['./date-selection.component.scss'],
})
export class DateSelectionComponent implements OnInit, OnChanges {
  selectedDate: Date | null;
  expenseState$: Observable<string>;

  constructor(private store: Store) {
    const seaschDate = store.select(selectSearchDate);
    console.log(seaschDate);
    this.expenseState$ = seaschDate;
    this.selectedDate = new Date();
  }
  _onSelectedChange(date: Date): void {
    this.selectedDate = date;
    this.store.dispatch(
      setSearchDate({
        searchDate: formatDate(date, 'yyyy-MM-dd', 'en-US'),
      })
    );
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    console.log(this.selectedDate);
  }

  ngOnInit(): void {}
}
