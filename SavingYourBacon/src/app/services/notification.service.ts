import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import dateUtils from '../utilities/dateUtilities';
import { Observable } from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';
import { Constants } from '../common/constants';
import { Notification } from '../data-objects/notification';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class NotificationService {

  private notificationsUrl = Constants.ApiLocation + '/api/notifications';

  constructor(private http: Http) { }

  getNotificationsForUser(userId): Observable<Notification[]> {
    return this.http.get(this.notificationsUrl + "/getnotificationsbyuserid/" + userId)
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
