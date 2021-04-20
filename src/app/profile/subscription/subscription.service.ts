import { HttpClient, HttpErrorResponse, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_URL } from 'src/app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(
    private _http: HttpClient
  ) { }

  isSubscribed(username: string): Observable<boolean> {
    //TODO link to endpoint name
    return this._http.get(`${API_URL}/v1/user/${username}/subscription`).pipe(map(
      () => true, 
      (err: HttpErrorResponse) => {
        if (err.status === 404) { //status that is good
          return false
        }
        else {
          return false;
        }
      }
    ))
  }

  /**
   * Subscribe to give user
   * @param username username to subscribe to 
   */
  subscribe(username: string): Observable<HttpResponseBase | HttpErrorResponse> {
    return this._subscriberAction(username, "add");
  } 

  /**
   * Unsubscribe from give user
   * @param username username to subscribe to 
   */
   unsubscribe(username: string): Observable<HttpResponseBase | HttpErrorResponse> {
    return this._subscriberAction(username, "remove");
  } 

  private _subscriberAction(username: string, action: "add"|"remove"): Observable<HttpResponseBase|HttpErrorResponse> {
    return this._http.post(`${API_URL}/v1/user/${username}/subscriptions/${action}`, {}).pipe(map(
      (res: HttpResponseBase) => res as HttpResponseBase, 
      (err: HttpErrorResponse) => err as HttpErrorResponse
    ))
  }
}
