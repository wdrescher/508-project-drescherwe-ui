import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/app.interface';
import { AppStateService } from 'src/app/services/app-state.service';
import { SettingsService } from 'src/app/services/settings.service';
import { UserStateService } from 'src/app/services/user-state.service';
import { FileType, InitiateUploadSuccessResponse, UploadPayload, UploadType } from 'src/app/upload/upload.interface';
import { UploadService } from 'src/app/upload/upload.service';

import { AvatarSize } from './avatar-size';

@Component({
  selector: 'tattoo-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {
  @Input() url: string;
  @Input() size: AvatarSize = AvatarSize.SMALL;
  @Input() edit: boolean = false;

  isLoading: boolean = false; 
  id: string = Math.random().toString(36).substring(7)
  constructor(
    private uploadService: UploadService,
    private settingsService: SettingsService, 
    private appStateService: AppStateService, 
    private userStateService: UserStateService
  ) { }

  ngOnInit(): void {
  }

  get isDefault(): boolean {
    return !!this.url;
  }

  get imgClass(): string {
    return `avatar-img-${this.size}`
  }

  handleFileInput(file: File): void {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (_event) => {
      this.url = reader.result.toString();
    }

    this._uploadFile(file); 
  }

  private _error(): void {
    this.url = undefined;
    this.appStateService.displayErrorModal = true; 
    this.isLoading = false; 
  }

  private _uploadFile(file: File): void {
    this.isLoading = true; 
    let uploadPayload: UploadPayload[] = [
      {
        file_type: FileType.IMAGE,
        description: '',
        display_rank: 0
      }
    ]
    this.uploadService.initiateUpload(UploadType.CONTENT, uploadPayload)
    .pipe(map(
      (response: InitiateUploadSuccessResponse) => {
        let url: string; 
        let content_id = response.content_id;
        this.isLoading = false;
        let chain: Observable<Observable<void>>[] = []; 
        response.upload_bodies.forEach(body => {
          body.forEach(size => {
            url = size.url; 
            let obs = this.uploadService.s3Upload(size.url, size.fields, file)
              .pipe(map(
                (res: string) => {
                  return this.uploadService.completeUpload(res).pipe(map(
                    () => {}, 
                    () => {
                      this._error(); 
                    }
                  ))
                }, 
                () => {
                  this._error(); 
                }
              ));
            chain.push(obs); 
          })
        })
        this.uploadService.combineObservables(chain).subscribe(
          () => {}, 
          () => {
            this._error();
          }, 
          () => {
            let data = {
              'profile_image_content_id': content_id.toLowerCase()
            }
            this.settingsService.updateUser(this.userStateService.username, data).subscribe(
              (res: User) => {
                this.userStateService.loadUser(res); 
                this.isLoading = false; 
              }, 
              () => {
                this._error();
              }
            )
          }
        )
      }, 
      () => {
        this.url = undefined;  
      }
    )).subscribe(); 
  }
}

