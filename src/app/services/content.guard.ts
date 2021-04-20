import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AppState } from '../app.interface';
import { ContentDetailStateService } from '../content-detail/content-detail-state.service';

@Injectable({
  providedIn: 'root'
})
export class ContentGuard implements CanActivate {
  constructor(
    private _contentDetailStateService: ContentDetailStateService, 
    private _router
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //TODO check against api and permissions to make sure user can view given content

    // this._contentDetailStateService.setContent()
    return this._router.navigateByUrl(AppState.DETAIL)
  }
}
