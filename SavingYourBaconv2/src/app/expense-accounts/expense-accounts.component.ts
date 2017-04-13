import { Component, OnInit } from '@angular/core';
import { ExpenseAccountType } from '../data-objects/expenseAccountType';
import { ExpenseService } from '../services/expense.service';
import { ExpenseType } from '../data-objects/expenseType';
import { Expense } from '../data-objects/expense';
import { ExpenseRecord } from '../data-objects/expenseRecord';
import { MdDialog, MdDialogRef, MdDialogConfig, MdSnackBar } from '@angular/material';
import { ConfirmDialogComponent } from '../common/confirm-dialog.component';
import { ConfirmDialog as ConfirmDialogModel } from '../data-objects/confirmDialog';
import {User} from '../data-objects/user';
import recordUtils from '../utilities/recordUtilities';

declare let _: any;

@Component({
  selector: 'expense-accounts',
  templateUrl: './expense-accounts.component.html',
  styleUrls: ['./expense-accounts.component.scss'],
  providers: [ExpenseService]
})
export class ExpenseAccountsComponent implements OnInit {

  expenses: Expense[] = [];
  mode = 'Observable';
  newExpenseAccountName: string;
  currentUser: User;
  errorMessage: string;
  expenseAccounts: ExpenseType[] = [];
  loading: boolean = true;
  expenseAccountExists: boolean = false;

  constructor(public dialog: MdDialog, private expenseService: ExpenseService, public snackBar: MdSnackBar) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.getExpenseTypesForUser();
    this.getExpenses();
  }

  getExpenseTypesForUser() {
    this.expenseService.getExpenseTypes(this.currentUser.UserId)
      .subscribe(data => this.expenseAccounts = data,
      error => this.errorMessage = <any>error,
      () => {this.expenseAccountExists = this.expenseAccounts.length > 0});
  }

  getExpenses() {
    this.expenseService.getExpense(this.currentUser.UserId)
      .subscribe(data => {this.expenses = data; console.log(data);},
      error => this.errorMessage = <any>error,
      () => {this.loading = false});
  }

  handleExpenseEdit(event) {

    let that = this;

    this.expenseService.updateExpense(event.data)
      .subscribe(data => {
        that.snackBar.open('Expense record updated successfully!', '', { duration: 1000 });
      },
      error => this.errorMessage = <any>error);
  }

  confirmDeleteAccountDialog() {

    let that = this;

  }

  deleteExpense(expense: ExpenseRecord) {
    let that = this;
    let model: ConfirmDialogModel = { Title: "Are you sure?", Body: "" };
    let dialogRef = this.dialog.open(ConfirmDialogComponent, { data: model });

    dialogRef.afterClosed()
      .subscribe(data => {
        if (data) {

          this.expenseService.deleteExpense(expense.ExpenseId)
            .subscribe(data => {
              _.remove(this.expenses, function (currentObject) {
                return currentObject.ExpenseId === expense.ExpenseId;
              });
              that.snackBar.open('Expense record deleted successfully!', '', { duration: 1000 });
            },
            error => this.errorMessage = <any>error);


        } else {
          return false;
        }

      }, error => this.errorMessage = <any>error
      );
  }

  createExpenseAccount() {
    let dialogRef = this.dialog.open(CreateExpenseAccountDialog, { data: this.expenseAccounts });
    dialogRef.afterClosed().subscribe(newExpenseAccount => {

      if (!newExpenseAccount || !newExpenseAccount.length)
        return;

      this.newExpenseAccountName = newExpenseAccount;

      let expenseAccountType: ExpenseAccountType = {
        expenseAccountName: this.newExpenseAccountName,
        userId: this.currentUser.UserId
      };

      let that = this;

      this.expenseService.addExpenseAccountForUser(expenseAccountType)
        .subscribe(function () {
          that.expenseAccounts.push({ ExpenseAccountId: 1, ExpenseAccountName: expenseAccountType.expenseAccountName });
          that.snackBar.open('Expense account added successfully!', '', { duration: 5000 });
        },
        error => this.errorMessage = <any>error);
    });
  }

  getTypeName(id){
    return recordUtils.getAmountTypeName(id);
  }

}

@Component({
  selector: 'create-expense-account-dialog',
  templateUrl: './create-expense-account-dialog.html',
})
export class CreateExpenseAccountDialog {

  newExpenseAccount: string;
  expenseAccounts = [];

  constructor(public dialogRef: MdDialogRef<CreateExpenseAccountDialog>) { }

  ngOnInit() {
    this.expenseAccounts = this.dialogRef._containerInstance.dialogConfig.data;
  }

  closeDialog() {
    this.dialogRef.close();
  }

  addExpenseAccount() {
    this.dialogRef.close(this.newExpenseAccount);
  }
}
