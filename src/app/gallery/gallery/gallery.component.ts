import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { map, take } from 'rxjs/operators';
import { concat, merge, Observable, Subscription } from 'rxjs';

import { AWAITING_VERIFICATION_KEY } from 'src/app/app.constants';
import { AuthService } from 'src/app/services/auth.service';
import { UserStateService } from 'src/app/services/user-state.service';
import { GalleryService } from '../gallery.service';
import { FeedResponse, TileData } from '../gallery.interface';
import { AppStateService } from 'src/app/services/app-state.service';
import { Content } from 'src/app/shared/content/content.interface';
import { ContentService } from 'src/app/services/content.service';


interface ContentTracker {
  name: string; 
  content_id: string;
  content?: Content
}

@Component({
  selector: 'tattoo-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  isResendEmailLoading = false;
  buttonText = "Resend"
  iconText = "";

  feed: ContentTracker[] = []; 
  currentOffset = 0; 

  isLoading = true; 

  constructor(
    private userStateService: UserStateService,
    private authService: AuthService,
    private cookieService: CookieService,
    private galleryService: GalleryService,
    private appStateService: AppStateService, 
    private contentService: ContentService
  ) { }

  ngOnInit(): void {
    if (this.userStateService.isLoggedIn) {
      this._loadFeed(); 
    }
  }

  private _loadFeed(): Subscription {
    return this.galleryService.galleryFeed(this.userStateService.username, this.currentOffset, 100).subscribe(
      (response: FeedResponse) => {
        this.currentOffset = response.pagination_next.offset;
        response.feed.forEach(elem => {
          this.feed.push({
            name: elem.username, 
            content_id: elem.content_id
          })
        })
        this.isLoading = false; 
        this._loadContent(0, this.currentOffset);
      },
      () => {
        this.appStateService.displayErrorModal = true;
      }
    )
  }
  
  private _loadContent(startIndex: number, pageSize: number): void {
    let chain = new Observable<void>();
    for (let i = 0; i < pageSize && i < this.feed.length; i++){
      if (!!this.feed[i].content) {
        continue; 
      }
      let obs = this.contentService.retrieveContent(this.feed[i].name, this.feed[i].content_id).pipe(map(
        (content: Content) => {
          this.feed[i].content = content;
        }, 
        () => {

        }
      ))
      chain = merge(chain, obs); 
    }
    chain.subscribe()
  }

  onScroll(): void {
    this._loadContent(0, 5); 
  }

  get awaitingVerification(): boolean {
    return this.userStateService.awaitingVerification;
  }

  resendEmail(): void {
    this.isResendEmailLoading = true;
    let email = this.cookieService.get(AWAITING_VERIFICATION_KEY);
    this.authService.generateToken(email)
      .pipe(take(1))
      .subscribe(
        () => {
          this.buttonText = "";
          this.iconText = "pi pi-check";
        },
        () => {
        },
        () => {
          this.isResendEmailLoading = false;
        }
      )
  }

  tileData(content: ContentTracker): TileData {
    return {
      name: content.name, 
      content: content.content
    }
  } 
}
