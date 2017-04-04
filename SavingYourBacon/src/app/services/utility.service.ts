import { Injectable } from '@angular/core';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Observable } from 'rxjs/Observable';

import { Http, Response } from '@angular/http';

import { Constants } from '../common/constants';

@Injectable()
export class UtilityService {

  private frequencyTypesUrl = Constants.ApiLocation + "/api/frequencytypes/getfrequencytypes";

  constructor(private http: Http) { }

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
