import { Component, OnInit } from '@angular/core';
import { Notification } from '../data-objects/notification';
import { NotificationService } from '../services/notification.service';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { User } from '../data-objects/user';
import { Message } from '../data-objects/message';

@Component({
  selector: 'notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  providers: [NotificationService]
})
export class NotificationsComponent implements OnInit {

  notifications: Notification[] = [];
  mode = 'Observable';
  currentUser: User;
  errorMessage: string;
  loading: boolean = true;

  constructor(public dialog: MdDialog, private notificationService: NotificationService) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.getNotificationsForUser();
  }

  getNotificationsForUser(){
    this.notificationService.getNotificationsForUser(this.currentUser.UserId)
      .subscribe(data => this.notifications = data,
      error => this.errorMessage = <any>error,
      () => {this.loading = false});
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

  notification: Message = new Message();

  constructor(public dialogRef: MdDialogRef<ViewNotificationDialog>) { }

  ngOnInit() {
    this.notification = this.dialogRef._containerInstance.dialogConfig.data;
  }
}
