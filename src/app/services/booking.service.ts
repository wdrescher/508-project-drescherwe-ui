import { HttpClient, HttpErrorResponse, HttpResponseBase } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_URL } from '../app.constants';
import { Booking } from '../app.interface';

export interface ListBookingsSuccessResponse {
  bookings: Booking[]
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  loadedBookings: Booking[]; 

  constructor(
    private _http: HttpClient
  ) { }

  listBookings(): Observable<ListBookingsSuccessResponse | HttpErrorResponse> {
    return this._http.get(`${API_URL}/api/booking/list`).pipe(map(
      (res: ListBookingsSuccessResponse) => {
        this.loadedBookings = res.bookings; 
        return res as ListBookingsSuccessResponse
      },
      (err: HttpErrorResponse) => err as HttpErrorResponse
    ))
  }

  listRequests(): Observable<ListBookingsSuccessResponse | HttpErrorResponse> {
    return this._http.get(`${API_URL}/api/booking/requests`).pipe(map(
      (res: ListBookingsSuccessResponse) => res as ListBookingsSuccessResponse,
      (err: HttpErrorResponse) => err as HttpErrorResponse
    ))
  }

  setPrice(bookingId: number, price: number): Observable<HttpResponseBase | HttpErrorResponse> {
    return this._http.get(`${API_URL}/api/booking/${bookingId}/set-price?price=${price}`).pipe(map(
      (res: HttpResponseBase) => res as HttpResponseBase, 
      (err: HttpErrorResponse) => err as HttpErrorResponse
    ))
  }
}
