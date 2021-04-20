import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';

import { AUTH_TOKEN_KEY, AWAITING_VERIFICATION_KEY } from '../app.constants';
import { User } from '../app.interface';

@Injectable({
  providedIn: 'root'
})
export class UserStateService {
  private _user: User;
  private _isLoggedIn = false;
  private _awaitingVerification: boolean;
  private _pendingApproval: boolean = false;
  private _newContent: File;

  $postInProgress = new Subject<boolean>();
  $newContentStream = new Subject<File>();
  token: string;

  constructor(
    private cookieService: CookieService
  ) { }

  signout(): void {
    this._isLoggedIn = false;
    this._user = undefined;
    this._awaitingVerification = false;
    this.cookieService.deleteAll("/");
  }

  login(token: string, expirationDate?: Date): void {
    this.cookieService.deleteAll();
    this.cookieService.set(AUTH_TOKEN_KEY, token, expirationDate, "/");
    this.token = token;
    this._awaitingVerification = false;
    this._isLoggedIn = true;
  }

  tempLogin(email: string): void {
    let now = new Date(); 
    now.setHours(now.getHours() + 2);
    this.cookieService.deleteAll("/"); 
    this.cookieService.set(AWAITING_VERIFICATION_KEY, email, now, "/");
    this._awaitingVerification = true;
  }

  loadUser(user: User): void {
    this._user = user;
  }

  get username(): string {
    return this.isDefined ? this._user.username : ''; 
  }

  get awaitingVerification(): boolean {
    return this._awaitingVerification;
  }

  get bio(): string {
    return this.isDefined ? this._user.bio : '';
  }
  
  get isDefined(): boolean {
    return !!this._user;
  }

  get isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  get firstName(): string {
    return this.isDefined ? this._user.first_name : "";  
  }

  get lastName(): string {
    return this.isDefined ? this._user.last_name : "";  
  }

  get email(): string {
    return this.isDefined ? this._user.email : "";
  }

  set newContent(file: File) {
    this.$postInProgress.next(true);
    this._newContent = file;
    this.$newContentStream.next(file);
  }

  get newContent(): File {
    return this._newContent;
  }


  get isCreator(): boolean {
    return true; 
    // return this.isDefined && !!this._user.id_front_url;
  }

  get pendingApproval(): boolean {
    return this._pendingApproval;
  }

  set pendingApproval(input: boolean) {
    this._pendingApproval = input;
  }
  
  get twitterUrl(): string {
    return this.isDefined ? this._user.twitter_url : ''; 
  }

  get instagramUrl(): string {
    return this.isDefined ? this._user.instagram_url : ''; 
  }

  get addressLine1(): string {
    return this.isDefined ? this._user.street_address : ''; 
  }

  get addressLine2(): string {
    return this.isDefined ? this._user.street_address_line_2 : ''; 
  }

  get city(): string {
    return this.isDefined ? this._user.city : ''; 
  }

  get stateOrProvince(): string {
    return this.isDefined ? this._user.state_or_province : ''; 
  }

  get country(): string {
    return this.isDefined ? this._user.country: ''; 
  }
}
