import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { API_URL } from '../app.constants';
import { Content } from '../shared/content/content.interface';
import { GetUserPostsSuccessResponse } from './content.interface';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  contentCache: {[content_id: string]: Content} = {}
  constructor(
    private _http: HttpClient
  ) {}

  getUserPosts(username: string, offset: number, limit: number): Observable<GetUserPostsSuccessResponse | HttpErrorResponse> {
    return this._http.get(`${API_URL}/v1/user/${username}/content?offset=${offset}&limit=${limit}`)
    .pipe(map(
      (res: GetUserPostsSuccessResponse) => res,
      (err: HttpErrorResponse) => err
    ));
  }

  
  retrieveContent(username: string, content_id: string): Observable<Content | HttpErrorResponse> {
    if (!!this.contentCache[content_id]) {
      return of(this.contentCache[content_id]);
    }
    return this._http.get(`${API_URL}/v1/user/${username}/content/${content_id}`).pipe(map(
      (res: Content) => {
        this.contentCache[res.id] = res; 
        return res;   
      }, 
      (err: HttpErrorResponse) => err
    ))
  }
}
