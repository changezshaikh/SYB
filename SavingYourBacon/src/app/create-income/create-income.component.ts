import { Component, OnInit } from '@angular/core';

import { IncomeService } from '../services/income-service.service';

import { ExpenseService } from '../services/expense.service';

import { IncomeRecord } from '../data-objects/incomeRecord';

import { UtilityService } from '../services/utility.service';

import { SelectOption } from '../data-objects/selectOption';

import { ExpenseType } from '../data-objects/expenseType';

import {MdDialog, MdDialogRef, MdSnackBar} from '@angular/material';

import {CalendarModule, ListboxModule, SelectItem} from 'primeng/primeng';

import {Router, ActivatedRoute, Params} from '@angular/router';

import recordUtils from '../utilities/recordUtilities';

import dateUtils from '../utilities/dateUtilities';

declare var jQuery: any;
declare var _: any;

@Component({
  selector: 'create-income',
  templateUrl: './create-income.component.html',
  styleUrls: ['./create-income.component.scss'],
  providers: [IncomeService, UtilityService, ExpenseService]
})
export class CreateIncomeComponent implements OnInit {

  dateFormat = "DD-MM-YYYY";
  errorMessage: string;
  frequencyTypes: SelectOption[];
  incomeNames: SelectOption[];
  incomeAmount: string;
  incomeDate: Date;
  mode = 'Observable';
  userId = 1000;
  recurringType: number;
  incomeTypeOptions = [];
  incomes = [];
  recurringTypes = [];
  newIncomeName: string;
  expenseTypes: SelectItem[];
  isInEditMode = false;

  incomeId: number = 0;
  selectedExpenseTypes: string[];
  selectedIncomeSourceId: number;
  selectedIncomeType: number;
  selectedFrequencyType: string;

  constructor(private incomeService: IncomeService, private expenseService: ExpenseService, public dialog: MdDialog, public snackBar: MdSnackBar, private utilityService: UtilityService, private router:Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.incomeTypeOptions = recordUtils.getIncomeTypeOptions();
    this.recurringTypes = recordUtils.getRecurringTypes();

    this.expenseTypes = [];
    this.getFrequencyTypes();
    this.getIncomes();
    this.getExpenseTypes();

     // subscribe to router event
    this.activatedRoute.params.subscribe((params: Params) => {
      let incomeId = params['id'];

      if(incomeId){
        this.incomeService.getIncomeForEdit(incomeId)
                          .subscribe(data => {
                            if(data){
                              this.populateFormForEdit(data[0]);
                              console.log(data[0]);
                            }
                          },
                          error => this.errorMessage = <any>error);
      }
    });
  }

  populateFormForEdit(income){
    this.isInEditMode = true;
    this.incomeId = income.IncomeId;
    this.selectedIncomeType = income.IncomeSourceTypeId;
    this.selectedIncomeSourceId = income.IncomeSourceTypeId;
    this.incomeAmount = income.IncomeAmount;
    this.incomeDate = new Date(income.IncomeDate);
    this.selectedFrequencyType = income.Frequency;
    
    let isRecurring = true;
    _.each(this.incomeTypeOptions, function(option){
      if(option.id == income.ExpenseAmountTypeId){
        isRecurring = false;
      } 
    });

    if(isRecurring){
      this.selectedIncomeType = -1;
      this.recurringType = income.ExpenseAmountTypeId;
    } else{
      this.selectedIncomeType = income.ExpenseAmountTypeId;
    }
     
    this.selectedExpenseTypes = _.split(income.LinkedExpenses, ",");
  }

  getFrequencyTypes(){
    this.utilityService.getFrequencyTypes()
                        .subscribe(data => this.frequencyTypes = data,
                                    error =>  this.errorMessage = <any>error);
  }

  getIncomes(){
    this.incomeService.getIncome(this.userId)
                        .subscribe(data => this.incomes = data,
                                    error =>  this.errorMessage = <any>error);
  }

  getExpenseTypes(){
    this.expenseService.getExpenseTypes(this.userId)
                        .subscribe(data => {
                                          if(!data){
                                            return;
                                          }

                                          for (let record of data) {
                                            this.expenseTypes.push({label:record.ExpenseAccountName, value:record.ExpenseAccountId}); 
                                          }
                                    },
                                    error =>  this.errorMessage = <any>error);
  }

  openDialog() {
    let dialogRef = this.dialog.open(CreateIncomeDialog);
    dialogRef.afterClosed().subscribe(newIncomeName => {
      this.newIncomeName = newIncomeName;
    });
  }

  saveIncomeRecord(){

    let incomeRecord: IncomeRecord = {
      IncomeId: this.incomeId,
      IncomeSourceTypeId: this.selectedIncomeSourceId,
      IncomeName: this.selectedIncomeSourceId == -1 ? this.newIncomeName : "",
      UserId: this.userId.toString(),
      Frequency: this.selectedFrequencyType,
      IncomeAmount: this.incomeAmount,
      IncomeDate: this.incomeDate !== null ? dateUtils.parseDateString(this.incomeDate.toLocaleDateString()) : "",
      ExpenseAmountTypeId: this.selectedIncomeType == -1 ? this.recurringType.toString() : this.selectedIncomeType.toString(),
      LinkedExpenses: this.selectedExpenseTypes.join(",")
    };

    let that = this;

    if(this.isInEditMode){
      this.incomeService.updateIncome(incomeRecord)
                          .subscribe(function(){
                                      that.snackBar.open('Record Saved successfully!', '', { duration: 1000 });
                                      //that.router.navigateByUrl('/expense-accounts');                                
                                    },
                                      error =>  this.errorMessage = <any>error);

    } else{
      this.incomeService.addIncomeForUser(incomeRecord)
                          .subscribe(function(){
                                      that.router.navigateByUrl('incomes');                                
                                    },
                                      error =>  this.errorMessage = <any>error);

    }
    
  }

}

@Component({
  selector: 'create-income-dialog',
  templateUrl: './create-income-dialog.html',
})
export class CreateIncomeDialog {

  newIncomeName: string;

  constructor(public dialogRef: MdDialogRef<CreateIncomeDialog>) {}

  closeDialog(){
    this.dialogRef.close();
  }

  addIncomeName(){
    this.dialogRef.close(this.newIncomeName);
  }
}
