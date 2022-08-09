import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'expense-summary',
  template: `
    <div class="expense-summary">
      <mat-card color="primary"> Income: $ {{ income_amount }} </mat-card>
      <mat-card class="expense-amount">
        Expense: $ {{ expense_amount }}
      </mat-card>
      <mat-card class="balance-amount">
        Balance: $ {{ income_amount - expense_amount }}
      </mat-card>
    </div>
  `,
  styleUrls: ['./expense-summary.component.scss'],
})
export class ExpenseSummaryComponent implements OnInit {
  @Input() expense_amount!: number;
  @Input() income_amount!: number;
  constructor() {}

  ngOnInit(): void {}
}
