import { Component, OnInit } from '@angular/core';

import { Expense } from '../data-objects/expense';

import { ExpenseService } from '../services/expense.service';

declare var $:any;

@Component({
  selector: 'important-dates',
  templateUrl: './important-dates.component.html',
  styleUrls: ['./important-dates.component.scss'],
  providers: [ExpenseService]
})
export class ImportantDatesComponent implements OnInit {

  errorMessage: string;
  importantDates: Expense[] = [];
  mode = 'Observable';
  userId = 1000;

  constructor(private expenseService: ExpenseService){}

  ngOnInit() {
      this.getExpenses();
  }

  getExpenses(){
      this.expenseService.getImportantExpenseDates(this.userId)
                        .subscribe(data => this.importantDates = data,
                                    error =>  this.errorMessage = <any>error);
  }

}