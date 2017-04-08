import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
 
import { AuthenticationService } from '../services/authentication.service';
import { AuthenticationModel } from '../data-objects/authenticationModel';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  model: any = {};
    loading = false;
    error = '';
 
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService) { }
 
    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
    }

    onLogin(credentials) {
      this.authenticationService.login(credentials);
    }
 
    login() {
        this.loading = true;
        let that = this;
        let loginModel: AuthenticationModel = {
          Username: this.model.username.toLowerCase(),
          Password: this.model.password
        };

        this.authenticationService.login(loginModel)
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
            () => {that.loading = false});
    }

}
