import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { User } from 'src/app/app.interface';

import { AppStateService } from 'src/app/services/app-state.service';
import { UpdateUserRequest } from 'src/app/services/settings.interface';
import { SettingsService } from 'src/app/services/settings.service';
import { UserStateService } from 'src/app/services/user-state.service';

interface Count {
  count: number,
  description: string;
  isSpacer?: boolean;
}

@Component({
  selector: 'tattoo-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  @Input() edit: boolean = false;
  @Output() editEvent = new EventEmitter<boolean>();
  @Input() username: string; 

  bio: string; 
  displayUsernameModal: boolean = false; 
  isLoading: boolean = false; 
  bioEdit: boolean = false;
  formGroup: FormGroup;
  formGroupUsername: FormGroup; 
  canSetUsername: boolean; 
  counts: Count[] = [
    {
      count: 150,
      description: 'free posts'
    },
    {
      count: 400,
      description: "premium posts"
    },
    {
      count: 100,
      description: "subscribers"
    }
  ]

  @Input() isUserProfile: boolean = false;
  constructor(
    private _formBuilder: FormBuilder,
    private _userStateService: UserStateService, 
    private _settingsService: SettingsService, 
    private _appStateService: AppStateService, 
    private _messageService: MessageService, 
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.isUserProfile) {
      this.bio = this._userStateService.bio === '' ? "Bio" : this._userStateService.bio; 
      this.formGroup = this._formBuilder.group(
        {
          'bio': [this._userStateService.bio]
        }
      )
      this.formGroupUsername = this._formBuilder.group({
        'username': [this._userStateService.username, [Validators.pattern(new RegExp('^([A-Z]|[a-z]|[0-9]|_)+$')), Validators.maxLength(20)]]
      })
    }
    for (let i = this.counts.length - 2; i >= 0; i--) {
      this.counts.splice(i + 1, 0, { count: 0, description: '', isSpacer: true })
    }

  }

  toggleBioEdit(): void {
    this.bioEdit = !this.bioEdit;
  }

  toggleEdit(): void {
    this.edit = !this.edit;
    this.editEvent.emit(this.edit);
  }

  editUsername(): void {
    this.displayUsernameModal = true; 
  }

  setUsername(): void {
    if (this.formGroupUsername.valid) {
      let username: string = this.formGroupUsername.controls['username'].value
      let data = {
        username: username.toLowerCase()
      }
      this._settingsService.updateUser(this._userStateService.username, data).subscribe(
        (res: User) => {
          this.username = res.username;
          this._userStateService.loadUser(res); 
          this.canSetUsername = false; 
          this.displayUsernameModal = false; 
        }, 
        () => {
          this._appStateService.displayErrorModal = true; 
        }
      )
    }
  }

  setValid(input: boolean): void {
    this.canSetUsername = input; 
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.isLoading = true; 
      let bio = this.formGroup.controls['bio'].value;
      let data: UpdateUserRequest = {
        bio: bio
      }
      this._settingsService.updateUser(this._userStateService.username, data).subscribe(
        (res: User) => {
          this._userStateService.loadUser(res);
          this.bio = res.bio;
          this.isLoading = false; 
          this.toggleBioEdit(); 
          let message: Message = {
            closable: true, 
            data: "Bio Updated", 
            severity: "success"
          }
          this._messageService.add(message); 
        }, 
        () => {
          this._appStateService.displayErrorModal = true; 
          this.isLoading = false; 
        }
      )
    }
  }
}
