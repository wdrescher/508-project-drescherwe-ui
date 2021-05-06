import { HttpClient, HttpErrorResponse, HttpResponseBase } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_URL } from '../app.constants';

export interface CreateParlorRequest {
  name: string,
  address_line_1: string,
  address_line_2: string,
  city: string,
  state: string,
  zip: 0,
  shop_commission: 0
}

@Injectable({
  providedIn: 'root'
})
export class ParlorService {

  constructor(
    private _http: HttpClient
  ) { }

  createParlor(data: CreateParlorRequest): Observable<HttpResponseBase | HttpErrorResponse> {
    return this._http.post(`${API_URL}/api/parlor/create`, data).pipe(map(
      (res: HttpResponseBase) => res as HttpResponseBase, 
      (err: HttpErrorResponse) => err as HttpErrorResponse
    ))
  }
}
