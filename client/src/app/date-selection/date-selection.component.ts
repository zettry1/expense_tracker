import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'expense-date-selection',
  template: ` <div class="calendar-wrapper">
    <mat-card class="calendar-card">
      <mat-calendar
        (selectedChange)="_onSelectedChange($event)"
        [selected]="selected"
      ></mat-calendar>
    </mat-card>
    <p>Selected date: {{ selected }}</p>
  </div>`,
  styleUrls: ['./date-selection.component.scss'],
})
export class DateSelectionComponent implements OnInit, OnChanges {
  selected: Date | null;

  constructor() {
    this.selected = new Date();
  }
  _onSelectedChange(date: Date): void {
    console.log('date', date);
    this.selected = date;
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    console.log(this.selected);
  }

  ngOnInit(): void {}
}
