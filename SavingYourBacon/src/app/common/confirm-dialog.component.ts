import { Component, OnInit } from '@angular/core';
import {MdDialog, MdDialogRef, MdSnackBar} from '@angular/material';
import { ConfirmDialog } from '../data-objects/confirmDialog';

@Component({
  selector: 'confirm-dialog',
  templateUrl: './confirm-dialog.html',
})
export class ConfirmDialogComponent {

  newExpenseAccount: string;
  expenseAccounts = [];
  model:ConfirmDialog;
  constructor(public dialogRef: MdDialogRef<ConfirmDialogComponent>, public dialog: MdDialog) {}

  ngOnInit() {
    this.model = this.dialogRef.config.data;
  }

  confirmAction(){
    this.dialogRef.close(true);
  }
}