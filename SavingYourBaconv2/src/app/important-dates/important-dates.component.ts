import { Component, OnInit } from '@angular/core';

import { Transaction } from '../data-objects/transaction';

import { TransactionService } from '../services/transaction.service';
import { User } from '../data-objects/user';

declare var $: any;

@Component({
  selector: 'important-dates',
  templateUrl: './important-dates.component.html',
  styleUrls: ['./important-dates.component.scss'],
  providers: [TransactionService]
})
export class ImportantDatesComponent implements OnInit {

  errorMessage: string;
  importantDates: Transaction[] = [];
  mode = 'Observable';
  currentUser: User;
  loading: boolean = true;

  constructor(private transactionService: TransactionService) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.getExpenses();
  }

  getExpenses() {
    this.transactionService.getImportantExpenseDates(this.currentUser.UserId)
      .subscribe(data => this.importantDates = data,
      error => this.errorMessage = <any>error,
      () => { this.loading = false });
  }

}