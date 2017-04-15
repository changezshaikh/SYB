import { Component, OnInit } from '@angular/core';
import { User } from '../data-objects/user';
import { CalendarModule } from 'primeng/primeng';
import { MdSnackBar } from '@angular/material';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'user-preferences',
  templateUrl: './user-preferences.component.html',
  styleUrls: ['./user-preferences.component.scss'],
  providers: [UserService, AuthenticationService]
})
export class UserPreferencesComponent implements OnInit {

  oldPassword: string;
  newPassword: string;
  repeatPassword: string;
  goLiveDate: Date;
  loading: boolean = false;
  errorMessage: string;
  firstName: string;
  lastName: string;
  email: string;
  passwordError: boolean = false;

  currentUser: User;

  constructor(public snackBar: MdSnackBar, private userService: UserService, private authService: AuthenticationService) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.goLiveDate = new Date(this.currentUser.GoLiveDate);
    this.firstName = this.currentUser.FirstName;
    this.lastName = this.currentUser.LastName;
    this.email = this.currentUser.Email;
  }

  saveUserPassword() {
    let that = this;
    this.loading = true;
    this.authService.changePassword(this.currentUser.UserId, this.oldPassword, this.newPassword)
      .subscribe(function (response) {
        if(response){
          that.snackBar.open('New Password saved successfully!', '', { duration: 2000 });
          that.passwordError = false;
          that.oldPassword = "";
          that.newPassword = "";
          that.repeatPassword = "";
        } else {
          that.passwordError = true;
        }
      },
      error => this.errorMessage = <any>error,
      () => that.loading = false);
  }

  saveUserEmail() {

  }

  saveUserRecord() {
    let that = this;
    this.currentUser.FirstName = this.firstName;
    this.currentUser.LastName = this.lastName;
    this.currentUser.Email = this.email;
    this.userService.updateUser(this.currentUser)
      .subscribe(function () {
        localStorage.setItem('currentUser', JSON.stringify(that.currentUser));
        that.snackBar.open('User details saved successfully!', '', { duration: 2000 });
      },
      error => this.errorMessage = <any>error);
  }

}
