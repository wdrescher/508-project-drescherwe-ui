import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { BookingService } from './booking.service';

@Injectable({
  providedIn: 'root'
})
export class BookingGuard implements CanActivate {

  constructor(
    private _bookingService: BookingService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this._bookingService.loadedBookings) {
      this._bookingService.listBookings().subscribe(); 
    }
    return true; 
  }
}
