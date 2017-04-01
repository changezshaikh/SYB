import { Component, OnInit } from '@angular/core';

import { Expense } from '../data-objects/expense';

import { ExpenseService } from '../services/expense.service';

declare var $:any;

@Component({
  selector: 'expense-overview',
  templateUrl: './expense-overview.component.html',
  styleUrls: ['./expense-overview.component.scss'],
  providers: [ExpenseService]
})
export class ExpenseOverviewComponent implements OnInit {

  errorMessage: string;
  expenses: Expense[];
  mode = 'Observable';
  userId = 1000;

  constructor(private expenseService: ExpenseService) {

  }

  ngOnInit() {
    this.getExpenses();
  }

  getExpenses(){
      this.expenseService.getExpense(this.userId)
                        .subscribe(data => this.expenses = data,
                                    error =>  this.errorMessage = <any>error);
  }

  ngAfterViewInit(): void{
     
  }

}
