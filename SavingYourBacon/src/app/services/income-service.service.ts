import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Income } from '../data-objects/income';

import { Observable } from 'rxjs/Observable';

import { IncomeRecord } from '../data-objects/incomeRecord';

import { Headers, RequestOptions } from '@angular/http';

import dateUtils from '../utilities/dateUtilities';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class IncomeService {

  private incomeUrl = 'http://localhost:55794/api/income';

  constructor(private http: Http) { }

  getIncome(userId): Observable<Income[]> {
    return this.http.get(this.incomeUrl + '/getincomebyuserid/' + userId)
                    .map(res => res.json())
                    .catch(this.handleError);
  }

  getIncomeForEdit(incomeId: number): Observable<Income> {
    return this.http.get(this.incomeUrl + '/getincome/' + incomeId)
                    .map(res => res.json())
                    .catch(this.handleError);
  }

  addIncomeForUser(incomeRecord: IncomeRecord){

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    //let incomeDate = dateUtils.parseDateString(incomeRecord.incomeDate);

    return this.http.post(this.incomeUrl + "/postincome", 
                          { incomeSourceTypeId: incomeRecord.IncomeSourceTypeId, 
                            newIncomeName: incomeRecord.IncomeName, 
                            userId: incomeRecord.UserId, 
                            frequency: incomeRecord.Frequency, 
                            incomeAmount: incomeRecord.IncomeAmount, 
                            incomeDate: incomeRecord.IncomeDate.toString(),
                            linkedExpenses: incomeRecord.LinkedExpenses,
                            expenseAmountTypeId: incomeRecord.ExpenseAmountTypeId }, 
                          options)
                          .map(res => res.json())
                          .catch(this.handleError);
  }

  updateIncome(incomeRecord: IncomeRecord){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    //let incomeDate = dateUtils.parseDateString(incomeRecord.incomeDate);

    return this.http.put(this.incomeUrl + "/putincome", 
                          { incomeId: incomeRecord.IncomeId,
                            incomeSourceTypeId: incomeRecord.IncomeSourceTypeId, 
                            newIncomeName: incomeRecord.IncomeName, 
                            userId: incomeRecord.UserId, 
                            frequency: incomeRecord.Frequency, 
                            incomeAmount: incomeRecord.IncomeAmount, 
                            incomeDate: incomeRecord.IncomeDate.toString(),
                            linkedExpenses: incomeRecord.LinkedExpenses,
                            expenseAmountTypeId: incomeRecord.ExpenseAmountTypeId }, 
                          options)
                          .map(res => res.json())
                          .catch(this.handleError);
  }

  deleteIncome(incomeId: number){
    return this.http.delete(this.incomeUrl + "/deleteincome/" + incomeId)
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
