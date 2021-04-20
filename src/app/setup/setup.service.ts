import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CreatorOptional } from './setup';

@Injectable({
  providedIn: 'root'
})
export class SetupService {
  public static displayErrorMessage(formGroup: FormGroup, controlName: string): boolean {
    if (!formGroup) {
      return false
    }
    let control = formGroup.controls[controlName]; 
    return control.invalid && (control.dirty || control.touched)
  }

  public static saveCreator(creator: CreatorOptional): void {
    window.sessionStorage.setItem("creator", JSON.stringify(creator)); 
  }

  constructor() { }
}
