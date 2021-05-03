import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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
}
