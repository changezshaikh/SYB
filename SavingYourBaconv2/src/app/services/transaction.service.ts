import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Transaction } from '../data-objects/transaction';
import { Headers, RequestOptions } from '@angular/http';
import { Constants } from '../common/constants';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TransactionService {

  private transactionUrl = Constants.ApiLocation + '/api/transactions';

  constructor(private http: Http) { }

  addPreviousBillsForUser(previousBills: Transaction[]){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.transactionUrl + "/posttransactions", 
                          previousBills, 
                          options)
                          .map(res => res.json())
                          .catch(this.handleError);
  }

  getExpensesForUser(userId: number){
    return this.http.get(this.transactionUrl + "/GetExpenseTransactionsByUserId/" + userId)
                    .map(res => res.json())
                    .catch(this.handleError);
  }

  getImportantExpenseDates(userId){
    return this.http.get(this.transactionUrl + "/getimportantdatesforuser/" + userId)
                    .map(res => res.json())
                    .catch(this.handleError);
  }

  getIncomeOverview(userId): Observable<Transaction[]> {
    return this.http.get(this.transactionUrl + '/GetIncomeTransactionsByUserId/' + userId)
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
