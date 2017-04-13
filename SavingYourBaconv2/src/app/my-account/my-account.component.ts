import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../services/transaction.service';
import { Transaction } from '../data-objects/transaction';
import { User } from '../data-objects/user';

@Component({
  selector: 'my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss'],
  providers: [TransactionService]
})
export class MyAccountComponent implements OnInit {

  transactions: Transaction[] = [];
  mode = 'Observable';
  currentUser: User;
  errorMessage: string;
  loading: boolean = true;

  constructor(private transactionService: TransactionService) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.getExpenseTransactionsForUser();
  }

  getExpenseTransactionsForUser(){
    this.transactionService.getExpensesForUser(this.currentUser.UserId)
      .subscribe(data => this.transactions = data,
      error => this.errorMessage = <any>error,
      () => {this.loading = false});
  }

  calculateGroupTotal(expenseAccount: string){
    let total = 0;
        
    if(this.transactions) {
        for(let transaction of this.transactions) {
            if(transaction.ExpenseAccountName === expenseAccount) {
                total += parseInt(transaction.AmountContributed);
            }
        }
    }

    return total;
  }

}
