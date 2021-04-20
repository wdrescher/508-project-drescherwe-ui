import { Component, EventEmitter, Input, OnInit, Output, Sanitizer } from '@angular/core';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { concat, merge, Observable } from 'rxjs';
import { map, mergeAll } from 'rxjs/operators';
import { AppStateService } from 'src/app/services/app-state.service';
import { UserStateService } from 'src/app/services/user-state.service';
import { ContentTracker, FileSize, FILE_SIZE } from '../content-tracker';
import { UploadService } from '../upload.service';

@Component({
  selector: 'tattoo-content-selector',
  templateUrl: './content-selector.component.html',
  styleUrls: ['./content-selector.component.scss']
})
export class ContentSelectorComponent implements OnInit {
  @Input() contentTracker: ContentTracker;
  @Input() accept: string;
  @Input() isVideo: boolean = false;
  @Output() isVideoEvent = new EventEmitter();

  croppedImage: any = '';

  private _canvasRotation = 0;
  constructor(
    private _userStateService: UserStateService,
    private _appStateService: AppStateService,
    private _uploadService: UploadService,
    private _ng2: Ng2ImgMaxService
  ) { }

  ngOnInit(): void {
    this._userStateService.$newContentStream.subscribe((file) => {
      if (file.type.indexOf('video') >= 0) {
        this.isVideo = true;
      }
      else {
        this._resizeAllAndMap(file);
      }
      this.isVideoEvent.emit(this.isVideo);
    })
    this.isVideo = this.contentTracker.file.type.indexOf('video') >= 0;
    this.isVideoEvent.emit(this.isVideo);
  }

  imageChangedEvent: any = '';

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.contentTracker.isLoading = true;
    this.croppedImage = event.base64;
    fetch(event.base64)
      .then(res => res.blob())
      .then(blob => {
        const file = new File([blob], this.contentTracker.file.name, { type: this.contentTracker.file.type })
        this._resizeAllAndMap(file);
      })
  }

  private _resizeAllAndMap(file: File) {
    this.contentTracker.croppedImage = {lg: file}; //Rely on cropper max size to ensure that this is at largest 1024/1280
    merge(
      this._resizeImage(file, FileSize.MEDIUM),
      this._resizeImage(file, FileSize.SMALL)
    ).subscribe(
      (res) => {
        this.contentTracker.isLoading = !(!!this.contentTracker.croppedImage.md && !!this.contentTracker.croppedImage.sm)
      }, 
      () => {
        this.contentTracker.isLoading = false; 
        this._appStateService.displayErrorModal = true
      }
    )
  }

  private _resizeImage(file: File, size: FileSize): Observable<void> {
    return this._ng2.resizeImage(file, FILE_SIZE[size].width, FILE_SIZE[size].height).pipe(map(
      (res) => {
        this.contentTracker.croppedImage[size] = res;
      },
      () => {}
    ));
  }

  imageLoaded(image: HTMLImageElement) {
    return true;
  }
  cropperReady() {
    return true;
  }
  loadImageFailed() {
    this._appStateService.displayErrorModal = true;
  }

  setFile(file) {
    this.contentTracker.file = file;
  }

  get canvasRotation(): number {
    return this._canvasRotation;
  }

  rotateRight(): void {
    this._canvasRotation++;
  }

  rotateLeft(): void {
    this._canvasRotation--;
  }

  get displayCropper(): boolean {
    return !!this.contentTracker.file;
  }
}
