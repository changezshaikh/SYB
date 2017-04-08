import { Component, OnInit } from '@angular/core';
import { Income } from '../data-objects/income';
import { IncomeService } from '../services/income-service.service';
import { IncomeRecord } from '../data-objects/IncomeRecord';
import { MdDialog, MdDialogRef, MdDialogConfig, MdSnackBar } from '@angular/material';
import { ConfirmDialogComponent } from '../common/confirm-dialog.component';
import { ConfirmDialog as ConfirmDialogModel } from '../data-objects/confirmDialog';

declare let _: any;

@Component({
  selector: 'incomes',
  templateUrl: './incomes.component.html',
  styleUrls: ['./incomes.component.scss'],
  providers: [IncomeService]
})
export class IncomesComponent implements OnInit {

  errorMessage: string;
  income: Income[] = [];
  mode = 'Observable';
  userId = 1000;

  constructor(private incomeService: IncomeService, public snackBar: MdSnackBar, public dialog: MdDialog) { }

  ngOnInit() {
    this.getIncome();
  }

  getIncome() {
    this.incomeService.getIncome(this.userId)
      .subscribe(data => this.income = data,
      error => this.errorMessage = <any>error);
  }

  handleIncomeEdit(event) {

    let that = this;

    this.incomeService.updateIncome(event.data)
      .subscribe(data => {
        that.snackBar.open('Income record updated successfully!', '', { duration: 1000 });
      },
      error => this.errorMessage = <any>error);
  }

  deleteIncome(income: IncomeRecord) {
    let that = this;
    let model: ConfirmDialogModel = { Title: "Are you sure?", Body: "" };
    let dialogRef = this.dialog.open(ConfirmDialogComponent, { data: model });

    dialogRef.afterClosed()
      .subscribe(data => {
        if (data) {
          this.incomeService.deleteIncome(income.IncomeId)
            .subscribe(data => {
              _.remove(this.income, function (currentObject) {
                return currentObject.IncomeId === income.IncomeId;
              });
              that.snackBar.open('Income record deleted successfully!', '', { duration: 1000 });
            },
            error => this.errorMessage = <any>error);

        } else {
          return false;
        }

      }, error => this.errorMessage = <any>error
      );
  }

}
