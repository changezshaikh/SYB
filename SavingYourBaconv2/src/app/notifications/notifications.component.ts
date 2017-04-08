import { Component, OnInit } from '@angular/core';
import { Notification } from '../data-objects/notification';
import { NotificationService } from '../services/notification.service';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';

@Component({
  selector: 'notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  providers: [NotificationService]
})
export class NotificationsComponent implements OnInit {

  notifications: Notification[] = [];
  mode = 'Observable';
  userId = 1000;
  errorMessage: string;

  constructor(public dialog: MdDialog, private notificationService: NotificationService) { }

  ngOnInit() {
    this.getNotificationsForUser();
  }

  getNotificationsForUser(){
    this.notificationService.getNotificationsForUser(this.userId)
      .subscribe(data => this.notifications = data,
      error => this.errorMessage = <any>error);
  }

  viewNotification(notification){
    let model = notification;
    let dialogRef = this.dialog.open(ViewNotificationDialog, { data: model });

    dialogRef.afterClosed()
      .subscribe(data => { }, 
                 error => this.errorMessage = <any>error
      );
  }
}

@Component({
  selector: 'view-notification-dialog',
  templateUrl: './view-notification.html',
})
export class ViewNotificationDialog {

  notification = {};

  constructor(public dialogRef: MdDialogRef<ViewNotificationDialog>) { }

  ngOnInit() {
    this.notification = this.dialogRef._containerInstance.dialogConfig.data;
  }
}
