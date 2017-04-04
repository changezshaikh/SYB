import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../services/transaction.service';
import { Transaction } from '../data-objects/transaction';

@Component({
  selector: 'my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss'],
  providers: [TransactionService]
})
export class MyAccountComponent implements OnInit {

  transactions: Transaction[];
  mode = 'Observable';
  userId = 1000;
  errorMessage: string;

  constructor(private transactionService: TransactionService) { }

  ngOnInit() {
    this.getExpenseTransactionsForUser();
  }

  getExpenseTransactionsForUser(){
    this.transactionService.getExpensesForUser(this.userId)
      .subscribe(data => this.transactions = data,
      error => this.errorMessage = <any>error);
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
