import { Component, OnInit } from '@angular/core';
import { SelectOption } from '../data-objects/selectOption';
import { ExpenseType } from '../data-objects/expenseType';
import { ExpenseRecord } from '../data-objects/expenseRecord';
import { ExpenseService } from '../services/expense.service';
import { UtilityService } from '../services/utility.service';
import {MdDialog, MdDialogRef, MdSnackBar} from '@angular/material';
import {CalendarModule} from 'primeng/primeng';
import {Router, ActivatedRoute, Params} from '@angular/router';
import recordUtils from '../utilities/recordUtilities';
import dateUtils from '../utilities/dateUtilities';

declare let _:any;

@Component({
  selector: 'create-expense',
  templateUrl: './create-expense.component.html',
  styleUrls: ['./create-expense.component.scss'],
  providers: [ExpenseService, UtilityService]
})
export class CreateExpenseComponent implements OnInit {

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
  userId = 1000;
  recurringType: number;
  expenseAccountForNames = {
  };
  expenseTypeOptions = [];
  recurringTypes = [];
  isInEditMode = false;

  newExpenseName: string;
  selectedExpenseId: number = 0;

  constructor(private expenseService: ExpenseService, public dialog: MdDialog, private utilityService: UtilityService, private router:Router, private activatedRoute: ActivatedRoute, public snackBar: MdSnackBar) { }

  ngOnInit() {

    this.expenseTypeOptions = recordUtils.getIncomeTypeOptions();
    this.recurringTypes = recordUtils.getRecurringTypes();

    this.getExpenseTypesForUser();
    this.getFrequencyTypes();

     // subscribe to router event
    this.activatedRoute.params.subscribe((params: Params) => {
      let expenseId = params['id'];

      if(expenseId){
        this.expenseService.getExpenseForEdit(expenseId)
                          .subscribe(data => {
                            if(data){
                              this.populateFormForEdit(data[0]);
                            }
                          },
                          error => this.errorMessage = <any>error);
      }
    });
  }

  populateFormForEdit(expense){
    this.isInEditMode = true;
    this.selectedExpenseId = expense.ExpenseId;
    this.selectedExpenseType = expense.ExpenseTypeId;
    this.selectedExpenseAccount = expense.ExpenseAccount.ExpenseAccountId;
    this.updateExpenseNames(this.selectedExpenseAccount);
    this.selectedExpenseName = expense.ExpenseName;
    this.billAmount = expense.BillAmount;
    this.billDate = new Date(expense.BillDate);
    this.selectedFrequencyType = expense.Frequency;
    
    let isRecurring = true;
    _.each(this.expenseTypeOptions, function(option){
      if(option.id == expense.ExpenseAmountTypeId){
        isRecurring = false;
      } 
    });

    if(isRecurring){
      this.selectedExpenseType = -1;
      this.recurringType = expense.ExpenseAmountTypeId;
    } else{
      this.selectedExpenseType = expense.ExpenseAmountTypeId;
    }
  }

  getExpenseTypesForUser(){
      this.expenseService.getExpenseTypes(this.userId)
                        .subscribe(data => this.expenseTypes = data,
                                    error =>  this.errorMessage = <any>error);
  }

  getExistingExpenseTypesForUser(){
    let that = this;
    this.expenseService.getExpenseTypes(this.userId)
                      .subscribe(data => {
                                            that.expenseTypes = data;
                                            that.updateExpenseNames(this.expenseTypes[0]);
                                          },
                                  error =>  this.errorMessage = <any>error);
  }

  getFrequencyTypes(){
    this.utilityService.getFrequencyTypes()
                        .subscribe(data => this.frequencyTypes = data,
                                    error =>  this.errorMessage = <any>error);
  }

  updateExpenseNames(value){
    this.selectedExpenseName = null;
    this.newExpenseName = null;
    if(this.expenseTypes){
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

  saveExpenseRecord(){

    let expenseRecord: ExpenseRecord = {
      ExpenseId: this.selectedExpenseId,
      ExpenseAccountId: this.selectedExpenseAccount,
      ExpenseName: this.selectedExpenseName == "-1" ? this.newExpenseName : this.selectedExpenseName,
      UserId: this.userId.toString(),
      Frequency: this.selectedFrequencyType,
      BillAmount: this.billAmount,
      BillDate: this.billDate !== null ? dateUtils.parseDateString(this.billDate.toLocaleDateString()) : "",
      ExpenseAmountTypeId: this.selectedExpenseType == -1 ? this.recurringType.toString() : this.selectedExpenseType.toString()
    };

    let that = this;

    if(this.isInEditMode){
      this.expenseService.updateExpense(expenseRecord)
                          .subscribe(function(){
                                      that.snackBar.open('Record Saved successfully!', '', { duration: 1000 });                                
                                    },
                                      error =>  this.errorMessage = <any>error);

    } else{
      this.expenseService.addExpenseForUser(expenseRecord)
                        .subscribe(function(){
                                    that.router.navigateByUrl('/expense-accounts');                                
                                  },
                                    error =>  this.errorMessage = <any>error);

    }

    
    
  }

}

@Component({
  selector: 'create-expense-dialog',
  templateUrl: './create-expense-dialog.html',
})
export class CreateExpenseDialog {

  newExpenseName: string;

  constructor(public dialogRef: MdDialogRef<CreateExpenseDialog>) {}

  closeDialog(){
    this.dialogRef.close();
  }

  addExpenseName(){
    this.dialogRef.close(this.newExpenseName);
  }
}
