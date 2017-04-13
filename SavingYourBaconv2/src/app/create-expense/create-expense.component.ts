import { Component, OnInit } from '@angular/core';
import { SelectOption } from '../data-objects/selectOption';
import { ExpenseType } from '../data-objects/expenseType';
import { ExpenseRecord } from '../data-objects/expenseRecord';
import { Transaction } from '../data-objects/transaction';
import { ExpenseService } from '../services/expense.service';
import { UtilityService } from '../services/utility.service';
import { TransactionService } from '../services/transaction.service';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
import { CalendarModule } from 'primeng/primeng';
import { Router, ActivatedRoute, Params } from '@angular/router';
import recordUtils from '../utilities/recordUtilities';
import dateUtils from '../utilities/dateUtilities';
import { ConfirmDialogComponent } from '../common/confirm-dialog.component';
import { ConfirmDialog as ConfirmDialogModel } from '../data-objects/confirmDialog';
import { Constants } from '../common/constants';
import { User } from '../data-objects/user';

declare let _: any;

@Component({
  selector: 'create-expense',
  templateUrl: './create-expense.component.html',
  styleUrls: ['./create-expense.component.scss'],
  providers: [ExpenseService, UtilityService, TransactionService]
})
export class CreateExpenseComponent implements OnInit {

  currentUser: User;
  errorMessage: string;
  expenseTypes: ExpenseType[];
  frequencyTypes: SelectOption[];
  expenseNames: ExpenseType[];
  selectedExpenseAccount: number;
  selectedExpenseName: string;
  selectedFrequencyType: string;
  billAmount: string;
  billDate: Date;
  selectedExpenseType: number;
  mode = 'Observable';
  recurringType: number;
  expenseAccountForNames = {
  };
  expenseTypeOptions = [];
  recurringTypes = [];
  isInEditMode = false;
  loading: boolean = true;

  newExpenseName: string;
  selectedExpenseId: number = 0;

  // property controlling which view is shown to the user
  addPreviousBills: boolean = false;

  previousBills = [];
  previousBillDate: Date;
  previousBillAmount: string;

  constructor(private expenseService: ExpenseService, public dialog: MdDialog, private utilityService: UtilityService, private router: Router, 
              private activatedRoute: ActivatedRoute, public snackBar: MdSnackBar, private transactionService: TransactionService) { }

  ngOnInit() {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.expenseTypeOptions = recordUtils.getIncomeTypeOptions();
    this.recurringTypes = recordUtils.getRecurringTypes();

    this.getExpenseTypesForUser();
    // this.getExistingExpenseTypesForUser();
    this.getFrequencyTypes();

    // subscribe to router event
    this.activatedRoute.params.subscribe((params: Params) => {
      let expenseId = params['id'];

      if (expenseId) {
        this.expenseService.getExpenseForEdit(expenseId)
          .subscribe(data => {
            if (data) {
              this.populateFormForEdit(data[0]);
            }
          },
          error => this.errorMessage = <any>error);
      }
    });
  }

  ngAfterViewInit(){
    // this.updateExpenseNames(this.selectedExpenseAccount);
  }

  populateFormForEdit(expense) {
    this.isInEditMode = true;
    this.selectedExpenseId = expense.ExpenseId;
    this.selectedExpenseType = expense.ExpenseTypeId;
    this.selectedExpenseAccount = expense.ExpenseAccount.ExpenseAccountId;    
    this.selectedExpenseName = expense.ExpenseName;
    this.billAmount = expense.BillAmount;
    this.billDate = new Date(expense.BillDate);
    this.selectedFrequencyType = expense.Frequency;

    let isRecurring = true;
    _.each(this.expenseTypeOptions, function (option) {
      if (option.id == expense.ExpenseAmountTypeId) {
        isRecurring = false;
      }
    });

    if (isRecurring) {
      this.selectedExpenseType = -1;
      this.recurringType = expense.ExpenseAmountTypeId;
    } else {
      this.selectedExpenseType = expense.ExpenseAmountTypeId;
    }
  }

  getExpenseTypesForUser() {
    this.expenseService.getExpenseTypes(this.currentUser.UserId)
      .subscribe(data => this.expenseTypes = data,
      error => this.errorMessage = <any>error,
      () => {this.loading = false;});
  }

  getExistingExpenseTypesForUser() {
    let that = this;
    this.expenseService.getExpenseTypes(this.currentUser.UserId)
      .subscribe(data => {
        that.expenseTypes = data;
        that.updateExpenseNames(this.expenseTypes[0]);
      },
      error => this.errorMessage = <any>error);
  }

  getFrequencyTypes() {
    this.utilityService.getFrequencyTypes()
      .subscribe(data => this.frequencyTypes = data,
      error => this.errorMessage = <any>error);
  }

  updateExpenseNames(value) {
    this.selectedExpenseName = null;
    this.newExpenseName = null;
    if (this.expenseTypes) {
      this.expenseAccountForNames = this.expenseTypes.filter((option) => {
        return option.ExpenseAccountId == value;
      })[0];
    }
  }

  openDialog() {
    let dialogRef = this.dialog.open(CreateExpenseDialog);
    dialogRef.afterClosed().subscribe(newExpenseName => {
      this.newExpenseName = newExpenseName;
    });
  }

  confirmPreviousBillsDialog() {
    let model: ConfirmDialogModel = { Title: "Do you want to add previous " + (this.selectedExpenseName == "-1" ? this.newExpenseName : this.selectedExpenseName) + " bills?", Body: "" };
    let result = false;
    let dialogRef = this.dialog.open(ConfirmDialogComponent, { data: model });
    let that = this;
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        that.addPreviousBills = true;
        that.snackBar.open('Record Saved successfully!', '', { duration: 2000 });
      } else {
        that.router.navigateByUrl('/expense-accounts');
      }

    }, error => this.errorMessage = <any>error);
  }

  saveExpenseRecord() {

    let expenseRecord: ExpenseRecord = {
      ExpenseId: this.selectedExpenseId,
      ExpenseAccountId: this.selectedExpenseAccount,
      ExpenseName: this.selectedExpenseName == "-1" ? this.newExpenseName : this.selectedExpenseName,
      UserId: this.currentUser.UserId.toString(),
      Frequency: this.selectedExpenseType == -1 ? this.selectedFrequencyType : "",
      BillAmount: this.billAmount,
      BillDate: this.billDate !== null ? this.billDate.toLocaleDateString('en-US') : "",
      ExpenseAmountTypeId: this.selectedExpenseType == -1 ? this.recurringType.toString() : this.selectedExpenseType.toString()
    };

    let that = this;
    this.loading = !this.loading;

    if (this.isInEditMode) {
      this.expenseService.updateExpense(expenseRecord)
        .subscribe(function () {
          that.confirmPreviousBillsDialog();
        },
        error => this.errorMessage = <any>error);

    } else {
      this.expenseService.addExpenseForUser(expenseRecord)
        .subscribe(function (data) {
          that.selectedExpenseId = data.ExpenseId;
          that.confirmPreviousBillsDialog();
        },
        error => this.errorMessage = <any>error,
        () => {that.loading = !that.loading;});

    }
  }

  addPreviousBill() {
    this.previousBills.push({ BillDate: this.previousBillDate, BillAmount: this.previousBillAmount });
    this.previousBillDate = null;
    this.previousBillAmount = "";
  }

  savePreviousBills() {
    let that = this;
    let transactionList: Transaction[] = [];

    this.previousBills.forEach(bill => {
      let transaction: Transaction = {
        TransactionId: 0,
        BillDate: bill.BillDate.toLocaleDateString('en-US'),
        AmountContributed: "0",
        CustomAmount: bill.BillAmount,
        DefaultAmount: "0",
        SurplusDeficit: "0",
        TransactionSourceId: that.selectedExpenseId,
        TransactionTypeId: Constants.TransactionTypes.Expense,
        UserId: that.currentUser.UserId,
        ExpenseAccountName: "",
        ExpenseName: "",
        IncomeSourceName: "",
        Frequency: that.selectedFrequencyType
      };

      transactionList.push(transaction);
    });


    this.transactionService.addPreviousBillsForUser(transactionList)
      .subscribe(function () {
        that.router.navigateByUrl('/expense-accounts');
      },
      error => this.errorMessage = <any>error);
  }

}

@Component({
  selector: 'create-expense-dialog',
  templateUrl: './create-expense-dialog.html',
})
export class CreateExpenseDialog {

  newExpenseName: string;

  constructor(public dialogRef: MdDialogRef<CreateExpenseDialog>) { }

  closeDialog() {
    this.dialogRef.close();
  }

  addExpenseName() {
    this.dialogRef.close(this.newExpenseName);
  }
}
