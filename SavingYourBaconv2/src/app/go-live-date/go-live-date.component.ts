import { Component, OnInit } from '@angular/core';
import {CalendarModule} from 'primeng/primeng';
import { User } from '../data-objects/user';
import { UserService } from '../services/user.service';
import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'go-live-date',
  templateUrl: './go-live-date.component.html',
  styleUrls: ['./go-live-date.component.scss'],
  providers: [UserService]
})
export class GoLiveDateComponent implements OnInit {

  goLiveDate: Date;
  currentUser: User;
  goLiveClass: string;
  isDateEditable: boolean;
  errorMessage: string;

  constructor(private userService: UserService, public snackBar: MdSnackBar) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(this.currentUser.GoLiveDate){
      this.goLiveDate = new Date(this.currentUser.GoLiveDate);
    }
    
    this.goLiveClass = this.goLiveDate < new Date() ? 'active' : '';

    this.isDateEditable = this.goLiveDate == null || this.goLiveClass.length < 1;
  }

  setGoLiveDate(){
    let that = this;

    let user: User = {
      Email: this.currentUser.Email,
      FirstName: this.currentUser.FirstName,
      LastName: this.currentUser.LastName,
      UserId: this.currentUser.UserId,
      Username: this.currentUser.Username,
      GoLiveDate: this.goLiveDate,
      UserPassword: this.currentUser.UserPassword
    };

    this.userService.updateUser(user)
      .subscribe(data => {
              localStorage.setItem('currentUser', JSON.stringify(user));
              that.snackBar.open('Go Live Date updated successfully!', '', { duration: 1000 });
            },
            error => this.errorMessage = <any>error);
  }

}
