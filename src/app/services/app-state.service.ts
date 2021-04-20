import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  private _displayUploadModal: boolean = false; 
  private _displayErrorModal: boolean = false; 

  $resetUploadModal = new Subject<boolean>(); 
  
  constructor() { }

  toggleUploadModal(): void {
    this._displayUploadModal = !this._displayUploadModal; 
  }

  get displayUploadModal(): boolean {
    return this._displayUploadModal; 
  }

  set displayUploadModal(input: boolean) {
    this._displayUploadModal = input; 
    if (input === true) {
      this.$resetUploadModal.next(true); 
    }
  }
  
  toggleErrorModal(): void {
    this._displayErrorModal = !this._displayErrorModal; 
  }

  get displayErrorModal(): boolean {
    return this._displayErrorModal;
  }

  set displayErrorModal(input: boolean) {
    this._displayErrorModal = input; 
  }
}
