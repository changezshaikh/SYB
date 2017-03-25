import { Component, OnInit } from '@angular/core';

import { ExpenseType } from '../data-objects/expenseType';

import { ExpenseService } from '../services/expense.service';

@Component({
  selector: 'create-expense',
  templateUrl: './create-expense.component.html',
  styleUrls: ['./create-expense.component.scss'],
  providers: [ExpenseService]
})
export class CreateExpenseComponent implements OnInit {

  errorMessage: string;
  expenseTypes: ExpenseType[];
  selectedExpenseType: number = 0;
  mode = 'Observable';
  userId = 1000;

  constructor(private expenseService: ExpenseService) { }

  ngOnInit() {
    this.getExpenseTypesForUser();
  }

  getExpenseTypesForUser(){
      this.expenseService.getExpenseTypes(this.userId)
                        .subscribe(data => this.expenseTypes = data,
                                    error =>  this.errorMessage = <any>error);
  }

}
