import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SettingsService } from 'src/app/services/settings.service';
import { UserStateService } from 'src/app/services/user-state.service';
import { SetupService } from 'src/app/setup/setup.service';

@Component({
  selector: 'tattoo-username',
  templateUrl: './username.component.html',
  styleUrls: ['./username.component.scss']
})
export class UsernameComponent implements OnInit {
  @Input() formGroup: FormGroup;
  @Output() isValidEvent = new EventEmitter<boolean>(); 
  usernameAvailable: boolean = false;
  currentUsername: string;

  constructor(
    private _userStateService: UserStateService, 
    private _settingsService: SettingsService
  ) { }

  ngOnInit(): void {
    this.currentUsername = this._userStateService.username;
    this.formGroup.valueChanges.subscribe(
      val => {
        this.currentUsername = val.username;
        this._settingsService.doesUserExists(val.username).subscribe(
          () => {
            this.usernameAvailable = false;
            this.isValidEvent.emit(false);
          }, 
          (res: HttpErrorResponse) => { 
            if (res.status === 404 && res.error.detail === 'Username not found.') {
              this.usernameAvailable = true;
              this.isValidEvent.emit(this.enableUpdateUsername);
            }
          }
        );
      }
    )
  }

  get statusText(): string {
    return this.usernameAvailable ? 'Available' : "Unavailable"
  }

  displayError(formGroup: FormGroup, controlName: string) {
    return SetupService.displayErrorMessage(formGroup, controlName); 
  }

  get isUsernameUnchanged(): boolean {
    return this.currentUsername === this._userStateService.username;
  }

  get enableUpdateUsername(): boolean {
    return this.usernameAvailable && !this.isUsernameUnchanged;
  }
}
