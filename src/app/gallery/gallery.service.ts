import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_URL } from '../app.constants';
import { ArtistProfile, User } from '../app.interface';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  constructor(
    private _http: HttpClient
  ) {}

  getArtists(): Observable<ArtistProfile[] | HttpErrorResponse> {
    return this._http.get(`${API_URL}/api/artist/list`).pipe(map(
      (res: ArtistProfile[]) => res as ArtistProfile[],
      (err: HttpErrorResponse) => err as HttpErrorResponse
    ))
  }

  requestAppointment(artist_id: number, design_description: number): Observable<HttpResponseBase | HttpErrorResponse> {
    let data = {
      artist_id: artist_id, 
      design_description: design_description
    }
    return this._http.post(`${API_URL}/api/booking/create`, data).pipe(map(
      (res: HttpResponseBase) => res as HttpResponseBase,
      (err: HttpErrorResponse) => err as HttpErrorResponse
    ))
  }
}
