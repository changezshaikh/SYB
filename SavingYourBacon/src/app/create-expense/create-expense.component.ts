import { Component, OnInit } from '@angular/core';

import { SelectOption } from '../data-objects/selectOption';

import { ExpenseService } from '../services/expense.service';

@Component({
  selector: 'create-expense',
  templateUrl: './create-expense.component.html',
  styleUrls: ['./create-expense.component.scss'],
  providers: [ExpenseService]
})
export class CreateExpenseComponent implements OnInit {

  errorMessage: string;
  expenseTypes: SelectOption[];
  frequencyTypes: SelectOption[];
  selectedExpenseType: number = -1;
  selectedExpenseName: number = -1;
  billAmount: string;
  billDate: string;
  mode = 'Observable';
  userId = 1000;
  placeHolder: "option";

  constructor(private expenseService: ExpenseService) { }

  ngOnInit() {
    this.getExpenseTypesForUser();
    this.getFrequencyTypes();
  }

  getExpenseTypesForUser(){
      this.expenseService.getExpenseTypes(this.userId)
                        .subscribe(data => this.expenseTypes = data,
                                    error =>  this.errorMessage = <any>error);
  }

  getFrequencyTypes(){
    this.expenseService.getFrequencyTypes()
                        .subscribe(data => this.frequencyTypes = data,
                                    error =>  this.errorMessage = <any>error);
  }

}
