import { HttpClient, HttpErrorResponse, HttpResponseBase } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_URL } from '../app.constants';
import { Booking } from '../app.interface';

export interface ListBookingsSuccessResponse {
  bookings: Booking[]
}

export interface ListTimeSlotResponse {
  times: Date[]
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

  schedule(bookingId: number, times: string[]): Observable<HttpResponseBase | HttpErrorResponse> {
    let data = {
      times: times
    }
    return this._http.post(`${API_URL}/api/booking/${bookingId}/time-slot`, data).pipe(map(
      (res: HttpResponseBase) => res as HttpResponseBase, 
      (err: HttpErrorResponse) => err as HttpErrorResponse
    ))
  }

  approvePrice(booking_id: number): Observable<HttpResponseBase | HttpErrorResponse> {
    return this._http.get(`${API_URL}/api/booking/${booking_id}/approve-price`).pipe(map(
      (res: HttpResponseBase) => res as HttpResponseBase, 
      (err: HttpErrorResponse) => err as HttpErrorResponse
    ))
  }

  getTimes(booking_id: number): Observable<ListTimeSlotResponse | HttpErrorResponse> {
    return this._http.get(`${API_URL}/api/booking/${booking_id}/times`).pipe(map(
      (res: ListTimeSlotResponse) => res as ListTimeSlotResponse, 
      (err: HttpErrorResponse) => err as HttpErrorResponse
    ))
  }

  selectTime(booking_id: number, time: Date): Observable<HttpResponseBase | HttpErrorResponse> {
    let data = {
      date_time: time
    }
    return this._http.post(`${API_URL}/api/booking/${booking_id}/select-time`, data).pipe(map(
      (res: HttpResponseBase) => res as HttpResponseBase, 
      (err: HttpErrorResponse) => err as HttpErrorResponse
    ))
  }
}
