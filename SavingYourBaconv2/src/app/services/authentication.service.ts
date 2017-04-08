import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import { AuthenticationModel } from '../data-objects/authenticationModel';
import { User } from '../data-objects/user';
import { Constants } from "../common/constants";
 
@Injectable()
export class AuthenticationService {
    public token: string;
    authUrl: string = Constants.ApiLocation;
 
    constructor(private http: Http) {
        // set token if saved in local storage
        // var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        // this.token = currentUser && currentUser.token;
    }

    // login(loginModel: AuthenticationModel): Observable<boolean> {
    //     this.http.post('http://localhost/api/login/login', loginModel)
    //     .map(res => res.json())
    //     .subscribe(
    //         // We're assuming the response will be an object
    //         // with the JWT on an id_token key
    //         data => {
    //             localStorage.setItem('id_token', data.id_token);
    //             return true;
    //         },
    //         error => {
    //             console.log(error);
    //             return false;
    //         },
    //         () => {
    //             return false;
    //         }
    //     );
    // }

    loggedIn() {
        return tokenNotExpired();
    }

    logout() {
        localStorage.removeItem('id_token'); 
    }
 
    login(loginModel: AuthenticationModel): Observable<boolean> {
        return this.http.post(this.authUrl + '/api/login/login', loginModel)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let token = response.json() && response.json().token;
                if (token) {
                    // set token property
                    this.token = token;
                    let currentUser: User = response.json().dbUser;
 
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(currentUser));
                    localStorage.setItem('id_token', token);
 
                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });
    }
 
    // logout(): void {
    //     // clear token remove user from local storage to log user out
    //     this.token = null;
    //     localStorage.removeItem('currentUser');
    // }
}