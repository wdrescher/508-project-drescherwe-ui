import { HttpClient, HttpErrorResponse, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_URL } from '../app.constants';
import { Artist } from '../app.interface';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  constructor(
    private _http: HttpClient
  ) { }

  currentArtist(): Observable<Artist | HttpErrorResponse> {
    return this._http.get(`${API_URL}/api/artist`).pipe(map(
      (res: Artist) => res as Artist, 
      (err: HttpErrorResponse) => err as HttpErrorResponse
    ))
  }

  createArtist(minimumPrice: number, maxBookings: number): Observable<HttpResponseBase | HttpErrorResponse> {
    const data = {
      minimum_price: minimumPrice, 
      max_bookings: maxBookings, 
      is_manager: false, 
      parlor_id: undefined
    }
    return this._http.post(`${API_URL}/api/artist/create`, data).pipe(map(
      (res: HttpResponseBase) => res as HttpResponseBase, 
      (err: HttpErrorResponse) => err as HttpErrorResponse
    ))
  }
}
