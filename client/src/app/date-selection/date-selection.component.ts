import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'expense-date-selection',
  template: ` <div class="calendar-wrapper">
    <mat-card class="calendar-card">
      <mat-calendar [(selected)]="selected"></mat-calendar>
    </mat-card>
    <p>Selected date: {{ selected }}</p>
  </div>`,
  styleUrls: ['./date-selection.component.scss'],
})
export class DateSelectionComponent implements OnInit {
  selected: Date;

  constructor() {
    this.selected = new Date();
  }

  ngOnInit(): void {}
}
