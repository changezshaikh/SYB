import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import { AuthenticationModel } from '../data-objects/authenticationModel';
import { RegisterModel } from '../data-objects/registerModel';
import { User } from '../data-objects/user';
import { Constants } from "../common/constants";
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationService {
    public token: string;
    authUrl: string = Constants.ApiLocation;

    constructor(private http: Http, private router: Router) {
        // set token if saved in local storage
        // var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        // this.token = currentUser && currentUser.token;
    }

    loggedIn() {
        return tokenNotExpired();
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

    register(registerModel: RegisterModel) {
        return this.http.post(this.authUrl + '/api/login/register', registerModel)
            .map((response: Response) => {
                return true;
            }).catch(this.handleError);
    }

    changePassword(userId: number, oldPassword: string, newPassword: string){
        return this.http.post(this.authUrl + '/api/login/changepassword', {UserId: userId, OldPassword: oldPassword, NewPassword: newPassword})
            .map((response: Response) => {
                // password change successful if there's a jwt token in the response
                let token = response.json() && response.json().token;
                if (token) {
                    // set token property
                    this.token = token;
                    let currentUser: User = response.json().dbUser;

                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(currentUser));
                    localStorage.setItem('id_token', token);

                    // return true to indicate successful password change
                    return true;
                } else {
                    // return false to indicate wrong password
                    return false;
                }
            }).catch(this.handleError);
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('id_token');
        localStorage.removeItem('currentUser');
        this.router.navigate(['/login']);
    }

    private handleError(error: Response | any) {
        // In a real world app, you might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}