import { Component, OnInit } from '@angular/core';

import { Expense } from '../data-objects/expense';

import { ExpenseService } from '../services/expense.service';
import {User} from '../data-objects/user';

declare var $:any;

@Component({
  selector: 'expense-overview',
  templateUrl: './expense-overview.component.html',
  styleUrls: ['./expense-overview.component.scss'],
  providers: [ExpenseService]
})
export class ExpenseOverviewComponent implements OnInit {

  errorMessage: string;
  expenses: Expense[] = [];
  mode = 'Observable';
  currentUser: User;
  loading: boolean = true;

  constructor(private expenseService: ExpenseService) {

  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.getExpenses();
  }

  getExpenses(){
      this.expenseService.getExpense(this.currentUser.UserId)
                        .subscribe(data => this.expenses = data,
                                    error =>  this.errorMessage = <any>error,
      () => {this.loading = false});
  }

  ngAfterViewInit(): void{
     
  }

}
