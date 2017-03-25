import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Expense } from '../data-objects/expense';

import { ExpenseType } from '../data-objects/expenseType';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ExpenseService {

  private expenseUrl = 'http://localhost:55794/api/expenses';
  private frequencyTypesUrl = "http://localhost:55794/api/frequencytypes/getfrequencytypes"; 

  constructor(private http: Http) { }

  getExpense(userId): Observable<Expense[]> {
    return this.http.get(this.expenseUrl + "/getexpensebyuserid/" + userId)
                    .map(res => res.json())
                    .catch(this.handleError);
  }

  getExpenseTypes(userId): Observable<ExpenseType[]> {
    return this.http.get(this.expenseUrl + "/GetExpenseAccountTypesForUser/" + userId)
                    .map(res => res.json())
                    .catch(this.handleError);
  }

  getImportantExpenseDates(userId){
    return this.http.get(this.expenseUrl + "/getimportantdatesforuser/" + userId)
                    .map(res => res.json())
                    .catch(this.handleError);
  }

  getFrequencyTypes(){
    return this.http.get(this.frequencyTypesUrl)
                    .map(res => res.json())
                    .catch(this.handleError);
  }

  private handleError (error: Response | any) {
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
