import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';

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
  </div>`,
  styleUrls: ['./date-selection.component.scss'],
})
export class DateSelectionComponent implements OnInit, OnChanges {
  selectedDate: Date | null;

  constructor() {
    this.selectedDate = new Date();
  }
  _onSelectedChange(date: Date): void {
    console.log('date', date);
    this.selectedDate = date;
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    console.log(this.selectedDate);
  }

  ngOnInit(): void {}
}
