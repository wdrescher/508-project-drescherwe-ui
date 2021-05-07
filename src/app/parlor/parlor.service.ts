import { HttpClient, HttpErrorResponse, HttpResponseBase } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_URL } from '../app.constants';
import { Parlor } from '../app.interface';

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

  createParlor(data: CreateParlorRequest): Observable<Parlor | HttpErrorResponse> {
    return this._http.post(`${API_URL}/api/parlor/create`, data).pipe(map(
      (res: Parlor) => res as Parlor, 
      (err: HttpErrorResponse) => err as HttpErrorResponse
    ))
  }

  joinParlor(parlorId: number): Observable<HttpResponseBase | HttpErrorResponse> { 
    return this._http.get(`${API_URL}/api/parlor/join?parlor_id=${parlorId}`).pipe(map(
      (res: HttpResponseBase) => res as HttpResponseBase, 
      (err: HttpErrorResponse) => err as HttpErrorResponse
    ))
  }

  fetchParlor(parlorId: number): Observable<Parlor | HttpErrorResponse> {
    return this._http.get(`${API_URL}/api/parlor/${parlorId}`).pipe(map(
      (res: Parlor) => res as Parlor, 
      (err: HttpErrorResponse) => err as HttpErrorResponse
    ))
  }
}
