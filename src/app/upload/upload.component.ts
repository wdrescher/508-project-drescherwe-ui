import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { concat, merge, Observable, Subject } from 'rxjs';
import { map, mergeAll } from 'rxjs/operators';
import { AppStateService } from '../services/app-state.service';
import { UserStateService } from '../services/user-state.service';

import { ContentTracker } from './content-tracker';
import { FileType, InitiateUploadSuccessResponse, UploadDestination, UploadPayload, UploadType } from './upload.interface';
import { UploadService } from './upload.service';

@Component({
  selector: 'tattoo-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  content: ContentTracker[] = [];
  formGroup: FormGroup;
  isLoading: boolean = false;
  isSuccess: boolean = true;

  $isReadyToPost = new Subject<boolean>(); 

  responsiveOptions = [
    {
      breakpoint: '600px',
      numVisible: 1,
      numScroll: 1
    },
  ]

  constructor(
    private _formBuilder: FormBuilder,
    private _userStateService: UserStateService,
    private _appStateService: AppStateService,
    private _uploadService: UploadService
  ) { }

  ngOnInit(): void {
    this._userStateService.$newContentStream.subscribe((file) => {
      this.content.push({
        file: file
      })
    })
    this._appStateService.$resetUploadModal.subscribe((res) => {
      if (res) {
        this.isSuccess = false;
      }
    })
    this.formGroup = this._formBuilder.group({
      'caption': ['', Validators.maxLength(100)],
      'premium': [''],
    })
  }

  addNewFile(file: File): void {
    if (this.isKnownVideoType(file.type)) {
      this.content = [];
      this.content.push({
        file: file
      });
    }
    else if (this.isKnownImageType(file.type)) {
      this.content.push({
        file: file
      })
    }
  }

  get isReady(): boolean {
    return this.formGroup.valid && !!this.files && !!this.files[0] && !!this.files[0].file
  }

  post(): void {
    if (this.isReady && !this.isResizerLoading) {
      let caption = !!this.formGroup.controls['caption'].value ? this.formGroup.controls['caption'].value : ''; 
      this.isLoading = true;
      let payload: UploadPayload[] = []
      for (let i = 0; i < this.files.length; i++) {
        payload.push({
          description: i === 0 ? caption : '',
          display_rank: i,
          file_type: this.isVideo ? FileType.VIDEO : FileType.IMAGE
        })
      }
      this._uploadService.initiateUpload(UploadType.CONTENT, payload)
        .pipe()
        .subscribe(
          (res: InitiateUploadSuccessResponse) => {
            this.s3Upload(res.upload_bodies);
          },
          () => {
            this._appStateService.displayErrorModal = true;
            this.isLoading = false;
          }
        )
    }
    // else if (this.isResizerLoading) {
    //   this.isLoading = true;
    //   this.$isReadyToPost.subscribe(elem => {
    //     if (!this.isResizerLoading) {
    //       this.post(); 
    //     }
    //   })
    // }
  }

  s3Upload(uploadBodies: UploadDestination[][]): void {
    let chain: Observable<Observable<void>>[] = [];
    for (let j = 0; j < uploadBodies.length; j++) {
      let sizes = uploadBodies[j];
      for (let i = 0; i < sizes.length; i++) {
        let dest = sizes[i];
        let size = dest.fields.key.substr(dest.fields.key.length - 2, 2); 
        let file = this.isImage ? (this.files[j].croppedImage)[size] : this.files[j].file;
        let obs = this._uploadService.s3Upload(dest.url, dest.fields, file)
          .pipe(map(
            (res: string) => {
              return this._uploadService.completeUpload(res).pipe(map(
                () => {},
                () => {
                  this.isLoading = false;
                  this._appStateService.displayErrorModal = true;
                }
              ));
            },
            () => {
              this.isLoading = false;
              console.log(`Upload: Error uploading ${file} to ${dest.url}`)
              this._appStateService.displayErrorModal = true;
            }
          ))
        chain.push(obs); 
      }
    }; 
    
    this._uploadService.combineObservables(chain).subscribe(
      () => {}, 
      () => {
        this.isLoading = false;
        this._appStateService.displayErrorModal = true; 
      }, 
      () => {
        this.isLoading = false; 
        this.isSuccess = true; 
        this.discard(true);
      }
    )
  }

  get isResizerLoading(): boolean {
    for (let content of this.content) {
      if (content.isLoading) {
        return true;
      }
    }
    this.$isReadyToPost.next(false); 
    return false;
  }

  displayCropper(): boolean {
    return true;
  }

  handleImageUpload(content: ContentTracker, $event) {
    content.croppedImage = $event;
  }

  get files(): ContentTracker[] {
    return this.content.filter(file => !!file.file)
  }

  discard(keepOpen?: boolean): void {
    this.isLoading = false; 
    this.content = [];
    this.formGroup.controls['caption'].reset(); 
    this._userStateService.$postInProgress.next(false);
    if (!keepOpen) {
      this._appStateService.displayUploadModal = false;
    }
  }

  get canAddMore(): boolean {
    return this.files.length <= 4 && !this.isVideo;
  }

  isKnownVideoType(type: string): boolean {
    return type.indexOf('video') >= 0;
  }

  isKnownImageType(type: string): boolean {
    return true;
  }

  get isVideo(): boolean {
    for (let file of this.files) {
      if (file.file.type.indexOf('video') >= 0) {
        return true;
      }
    }
    return false;
  }

  get isImage(): boolean {
    for (let file of this.files) {
      if (file.file.type.indexOf('image') >= 0) {
        return true;
      }
    }
    return false;
  }

  get acceptedMediaTypes(): string {
    if (this.isVideo) {
      return 'video/*'
    }
    else if (this.isImage) {
      return 'image/*'
    }
    else {
      return 'video/*, image/*'
    }
  }
}
