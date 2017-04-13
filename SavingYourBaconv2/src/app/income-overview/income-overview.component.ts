import { Component, OnInit } from '@angular/core';

import { Income } from '../data-objects/income';

import { TransactionService } from '../services/transaction.service';
import { User } from '../data-objects/user';
import { Transaction } from '../data-objects/transaction';

declare var $: any;
declare var pleaseWait: any;

@Component({
  selector: 'income-overview',
  templateUrl: './income-overview.component.html',
  styleUrls: ['./income-overview.component.scss'],
  providers: [TransactionService]
})
export class IncomeOverviewComponent implements OnInit {

  errorMessage: string;
  income: Transaction[] = [];
  mode = 'Observable';
  currentUser: User;
  loading: boolean = true;

  constructor(private transactionService: TransactionService) {

  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.getIncome();
  }

  getIncome() {
    this.transactionService.getIncomeOverview(this.currentUser.UserId)
      .subscribe(data => this.income = data,
      error => this.errorMessage = <any>error,
      () => { this.loading = false });
  }

}
