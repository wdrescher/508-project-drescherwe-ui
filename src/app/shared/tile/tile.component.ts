import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppState } from 'src/app/app.interface';

import { ContentDetailStateService } from 'src/app/content-detail/content-detail-state.service'; 
import { TileData } from 'src/app/gallery/gallery.interface';
import { AppStateService } from 'src/app/services/app-state.service';
import { UserStateService } from 'src/app/services/user-state.service';

@Component({
  selector: 'tattoo-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent implements OnInit {
  @Input() tile: TileData;

  formGroup: FormGroup; 
  displayPopup: boolean = false; 
  isUserPost: boolean = false; 
  makeComment: boolean = false; 

  comments: {author: string, body: string}[] = [];

  private _didJustOpen: boolean = false; 

  constructor(
    private _detailState: ContentDetailStateService, 
    private _router: Router, 
    private _userStateService: UserStateService, 
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.isUserPost = this._userStateService.username === this.tile.name; 
    this.formGroup = this._formBuilder.group({
      'comment': ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]]
    })
  }

  navigateToUser(): void {
    let url = AppRoutingModule.calculateRoute([AppState.PROFILE, this.tile.name])
    this._router.navigateByUrl(url);
  }

  get canPost(): boolean {
    return this.formGroup.valid; 
  }

  togglePopup(): void {
    this.displayPopup = !this.displayPopup; 
    this._didJustOpen = true; 
  }

  toggleComment(): void {
    this.makeComment = !this.makeComment; 
  }

  inspectContent(): void {
    if (!!this.tile.content) {
      let id = "id";
      this._detailState.setContent(this.tile.content, this.tile.name); 
      this._router.navigateByUrl(`${AppState.DETAIL}/${id}`); 
    }
    else {
      // instruct user to get subscription
    }
  }

  postComment(): void {
    if (this.formGroup.valid) {
      let comment = {
        author: this._userStateService.username, 
        body: this.formGroup.controls["comment"].value
      }
      this.comments.push(comment); 

      //finally
      this.formGroup.controls["comment"].reset(); 
      this.toggleComment();
    }
  }

  get description(): string {
    return this.tile.content.body;
  }

  shouldClosePopup(): void {
    if (this.displayPopup && !this._didJustOpen) {
      this.displayPopup = false; 
    }
    this._didJustOpen = false
  }
}
