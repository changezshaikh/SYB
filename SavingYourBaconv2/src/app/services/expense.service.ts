import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Expense } from '../data-objects/expense';
import { ExpenseType } from '../data-objects/expenseType';
import { ExpenseRecord } from '../data-objects/expenseRecord';
import { ExpenseAccountType } from '../data-objects/expenseAccountType';
import dateUtils from '../utilities/dateUtilities';
import { Observable } from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';
import { Constants } from '../common/constants';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ExpenseService {

  private expenseUrl = Constants.ApiLocation + '/api/expenses';
  private expenseAccountsUrl = Constants.ApiLocation + '/api/expenseaccounts';

  constructor(private http: Http) { }

  getExpense(userId): Observable<Expense[]> {
    return this.http.get(this.expenseUrl + "/getexpensebyuserid/" + userId)
                    .map(res => res.json())
                    .catch(this.handleError);
  }

  getExpenseTypes(userId): Observable<ExpenseType[]> {
    return this.http.get(this.expenseAccountsUrl + "/GetExpenseAccountTypesForUser/" + userId)
                    .map(res => res.json())
                    .catch(this.handleError);
  }

  addExpenseForUser(expenseRecord: ExpenseRecord){

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.expenseUrl + "/postexpense", 
                          { expenseAccountId: expenseRecord.ExpenseAccountId, 
                            expenseName: expenseRecord.ExpenseName, 
                            userId: expenseRecord.UserId, 
                            frequency: expenseRecord.Frequency, 
                            billAmount: expenseRecord.BillAmount, 
                            billDate: expenseRecord.BillDate,
                            expenseAmountTypeId: expenseRecord.ExpenseAmountTypeId }, 
                          options)
                          .map(res => res.json())
                          .catch(this.handleError);
  }

  updateExpense(expenseRecord: ExpenseRecord){

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.put(this.expenseUrl + "/putexpense", 
                          { expenseId: expenseRecord.ExpenseId,
                            expenseAccountId: expenseRecord.ExpenseAccountId, 
                            expenseName: expenseRecord.ExpenseName, 
                            userId: expenseRecord.UserId, 
                            frequency: expenseRecord.Frequency, 
                            billAmount: expenseRecord.BillAmount, 
                            billDate: expenseRecord.BillDate,
                            expenseAmountTypeId: expenseRecord.ExpenseAmountTypeId }, 
                          options)
                          .map(res => res.json())
                          .catch(this.handleError);
  }

  addExpenseAccountForUser(expenseType: ExpenseAccountType){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.expenseAccountsUrl + "/postexpenseaccount", 
                          { expenseAccountName: expenseType.expenseAccountName, 
                            userId: expenseType.userId }, 
                          options)
                          .map(res => res.json())
                          .catch(this.handleError);

  }

  getExpenseForEdit(incomeId: number): Observable<Expense> {
    return this.http.get(this.expenseUrl + '/getexpense/' + incomeId)
                    .map(res => res.json())
                    .catch(this.handleError);
  }

  deleteExpense(expenseId: number){
    return this.http.delete(this.expenseUrl + "/deleteexpense/" + expenseId)
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
