import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { merge, Observable } from 'rxjs';
import { map, mergeAll } from 'rxjs/operators';

import { API_URL } from '../app.constants';
import { CompleteUploadBody, CompleteUploadSuccessResponse, InitiateUploadBody, InitiateUploadSuccessResponse, UploadPayload, UploadType } from './upload.interface';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(
    private _http: HttpClient
  ) { }

  initiateUpload(upload_type: UploadType, payload: UploadPayload[]): Observable<InitiateUploadSuccessResponse | HttpErrorResponse> {
    let data: InitiateUploadBody = {
      type: upload_type,
      payload_metadata: payload
    }
    return this._http.post(`${API_URL}/v1/upload/`, data).pipe(map(
      (res: InitiateUploadSuccessResponse) => res,
      (err: HttpErrorResponse) => err
    ))
  }

  completeUpload(s3_key: string): Observable<CompleteUploadSuccessResponse | HttpErrorResponse> {
    let data: CompleteUploadBody = {
      s3_key: s3_key
    }
    return this._http.post(`${API_URL}/v1/upload/confirm/`, data).pipe(map(
      (res: CompleteUploadSuccessResponse) => res,
      (err: HttpErrorResponse) => err
    ))
  }

  s3Upload(url: string, fields: any, file: File): Observable<string | HttpErrorResponse> {
    let formData = new FormData(); 
    let key = fields.key;
    for (let [key, value] of Object.entries(fields)) {
      formData.append(key, value as string);
    }
    formData.append('file', file);
    let headers = new HttpHeaders(
      {'Ignore-Bearer': 'true'}
    ); 
    return this._http.post(url, formData, {headers: headers}).pipe(map(
      () => key,
      (err: HttpErrorResponse) => err
    ));
  }

  /**
   * Consumes higher order observables list and ouputs single observable combining all asynchronously
   * @param chain list of higher order observables
   * @returns 
   */
  combineObservables(chain: Observable<Observable<void>>[]): Observable<void> {
    let fullCall; 
    if (chain.length <= 1) {
      fullCall = chain[0]; 
    }
    else {
      fullCall = merge(
        chain[0], 
        chain[1]
      )
      for (let i = 2; i < chain.length; i++) {
        fullCall = merge(fullCall, chain[i]);
      }
    }
    return fullCall.pipe(mergeAll()); 
  }
}
