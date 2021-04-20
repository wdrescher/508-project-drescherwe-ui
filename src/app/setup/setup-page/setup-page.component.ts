import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AppState } from 'src/app/app.interface';
import { AppStateService } from 'src/app/services/app-state.service';
import { UpdateUserRequest } from 'src/app/services/settings.interface';
import { SettingsService } from 'src/app/services/settings.service';
import { UserStateService } from 'src/app/services/user-state.service';

import { CreatorOptional } from '../setup'; 

@Component({
  selector: 'tattoo-setup-page',
  templateUrl: './setup-page.component.html',
  styleUrls: ['./setup-page.component.scss']
})
export class SetupPageComponent implements OnInit {
  private _pageIndex = 0; 
  private _totalPageCount = 2; 
  private _indexKey = "index"; 
  private _creatorKey = "creator"; 
  pageChange: Subject<number> = new Subject(); 
  creator: CreatorOptional = {}
  validList = [];
  sessionStorage = window.sessionStorage; 

  isLoading = false; 

  constructor(
    private _userStateService: UserStateService, 
    private _appStateService: AppStateService,
    private _router: Router, 
    private _settingsService: SettingsService
  ) {}

  ngOnInit(): void {
    let storedCreator = this.sessionStorage.getItem(this._creatorKey); 
    let storedIndex = this.sessionStorage.getItem(this._indexKey); 
    if (!!storedCreator && storedCreator !== '') {
      this.creator = JSON.parse(storedCreator); 
    }
    if (this.creator !== {} && !!storedIndex && storedIndex !== '') {
      this._pageIndex = parseInt(storedIndex)
    }
    for (let i = 0; i < this._totalPageCount; i++) {
      this.validList.push(false); 
    }
  }

  next(): void {
    if (this.validList[this._pageIndex]) {
      if (this._pageIndex === this._totalPageCount - 1) {
        this.submit(); 
      }
      else {
        this.pageChange.next(this._pageIndex++)
        this._saveIndex();   
      }
    }
  }

  back(): void {
    this.pageChange.next(this._pageIndex--)
    this._saveIndex(); 
  }

  submit(): void {
    this.isLoading = true; 
    this._userStateService.awaitingVerification; 
    let data: UpdateUserRequest = {
      id_front_url: this.creator.id_front_url, 
      id_back_url: this.creator.id_back_url, 
      street_address: this.creator.address_line_1, 
      street_address_line_2: this.creator.address_line_2, 
      city: this.creator.city, 
      state_or_province: this.creator.state, 
      country: this.creator.country.code, 
      zip: this.creator.zip
    }
    this._settingsService.updateUser(this._userStateService.username, data).subscribe(
      () => {
        this.pageChange.next(this._pageIndex++);
        this._saveIndex();  
        this.isLoading = false; 
        this._userStateService.pendingApproval = true; 
        this._router.navigateByUrl(AppState.GALLERY); 
        this._appStateService.displayUploadModal = true; 
      }, 
      () => {
        this._appStateService.displayErrorModal = true;
        this.isLoading = false; 
      }
    )
  }
  
  private _saveIndex(): void {
    this.sessionStorage.setItem(this._indexKey, this._pageIndex.toString()); 
  }

  get disabled(): boolean {
    return !this.validList[this._pageIndex];
  }

  get displayBackButton(): boolean {
    return this._pageIndex !== 0;
  }

  get progressValue(): number {
    return ((this._pageIndex + 1)/  this._totalPageCount ) * 100; 
  }

  get pageIndex(): number {
    return this._pageIndex; 
  }

  get nextButtonLabel(): string {
    return this._pageIndex === this._totalPageCount - 1 ? 'Submit' : "Next"; 
  }

  get displayButtonRow(): boolean {
    return this._pageIndex < this._totalPageCount; 
  }
}
