import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';
import { RegisterModel } from '../data-objects/registerModel';

@Component({
  selector: 'register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  model: any = {};
  loading = false;
  error = '';

  constructor(
    public router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    
  }

  goBack(){
    this.router.navigate(['/']);
  }

  register() {
    this.loading = true;
    let that = this;
    let registerModel: RegisterModel = {
      FirstName: this.model.firstName,
      LastName: this.model.lastName,      
      Password: this.model.password,
      Email: this.model.email
    };

    this.authenticationService.register(registerModel)
      .subscribe(result => {
        if (result === true) {
          // login successful
          this.router.navigate(['/']);
        } else {
          // login failed
          this.error = 'Username or password is incorrect';
          this.loading = false;
        }
      },
      error => {
        this.error = 'Username or password is incorrect';
        this.loading = false;
      },
      () => { that.loading = false });
  }

}
