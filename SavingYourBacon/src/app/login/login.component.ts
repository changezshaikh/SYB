import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
 
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
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
        //this.authenticationService.logout();
    }
 
    login() {
        this.loading = true;
        if(this.model.username.toLowerCase() === "sybadmin" && this.model.password.toLowerCase() === "syb1234" ){
          this.router.navigate(['/dashboard']);
        } else{
          // login failed
          this.error = 'Username or password is incorrect';
          this.loading = false;
        }
        // this.authenticationService.login(this.model.username, this.model.password)
        //     .subscribe(result => {
        //         if (result === true) {
        //             // login successful
        //             this.router.navigate(['/']);
        //         } else {
        //             // login failed
        //             this.error = 'Username or password is incorrect';
        //             this.loading = false;
        //         }
        //     });
    }

}
