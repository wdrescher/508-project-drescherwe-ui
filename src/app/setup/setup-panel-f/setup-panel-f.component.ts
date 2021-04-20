import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { STATES } from 'src/app/app.constants';
import { AppStateService } from 'src/app/services/app-state.service';
import { FileUploadComponent } from 'src/app/shared/file-upload/file-upload.component';
import { FileType, InitiateUploadSuccessResponse, UploadPayload, UploadType } from 'src/app/upload/upload.interface';
import { UploadService } from 'src/app/upload/upload.service';
import { CreatorOptional, IDSide } from '../setup';

import { SetupService } from '../setup.service';

@Component({
  selector: 'tattoo-setup-panel-f',
  templateUrl: './setup-panel-f.component.html',
  styleUrls: ['./setup-panel-f.component.scss']
})
export class SetupPanelFComponent implements OnInit {
  @Input() pageChange: Subject<number>; 
  @Input() index: number; 
  @Input() validList: boolean[]; 
  @Input() creator: CreatorOptional; 

  clearFrontFile = new Subject<boolean>(); 
  clearBackFile = new Subject<boolean>(); 
  $isLoadingFront = new Subject<boolean>(); 
  $isLoadingBack = new Subject<boolean>(); 

  isLoadingFront = false; 
  isLoadingBack = false; 
  
  states = STATES;
  selectedState: string; 
  formGroup: FormGroup; 
  frontFile: File; 
  backFile: File; 

  displayFrontError: boolean = false; 
  displayBackError: boolean = false; 

  constructor(
    private _formBuilder: FormBuilder, 
    private _uploadService: UploadService, 
    private _appStateService: AppStateService
  ) { }

  ngOnInit(): void {
    this.pageChange.subscribe((pageIndex) => {
      if (pageIndex == this.index) {
        this.continue(); 
      }
    })
    this.formGroup = this._formBuilder.group({
      date_of_birth: [this.creator.date_of_birth, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]], 
      age_verified: [false, [Validators.required]]
    })
    this.validList[this.index] = this.isFormReady;
    this.formGroup.valueChanges.subscribe(() => {
      this.validList[this.index] = this.isFormReady; 
    })
  }

  displayError(controlName: string) {
    return SetupService.displayErrorMessage(this.formGroup, controlName); 
  }

  continue(): void {
    if (this.formGroup.valid) {
      this.creator.date_of_birth = this.formGroup.controls['date_of_birth'].value; 
      SetupService.saveCreator(this.creator); 
    }
  }
  
  setFileFront(file): void {
    this.frontFile = file; 
    this.validList[this.index] = this.isFormReady; 
    if (!!file) {
      this.isLoadingFront = true; 
      this.$isLoadingFront.next(this.isLoadingFront); 
      this._uploadFile("Front of drivers license", file, IDSide.FRONT); 
    }
  }

  setFileBack(file): void {
    this.backFile = file; 
    this.validList[this.index] = this.isFormReady; 
    if (!!file) {
      this.isLoadingBack = true; 
      this.$isLoadingBack.next(this.isLoadingBack); 
      this._uploadFile("Back of driver's license", file, IDSide.BACK)
    }
  }

  private _uploadFile(description: string, file: File, side: IDSide): void {
    let uploadPayload: UploadPayload[] = [
      {
        file_type: FileType.IMAGE, 
        description: description, 
        display_rank: 0
      }
    ]
    this._uploadService.initiateUpload(UploadType.DOCUMENT, uploadPayload).subscribe(
      (response: InitiateUploadSuccessResponse) => {
        let content_id = response.content_id; 
        this._uploadService.s3Upload(response.upload_bodies[0][0].url, response.upload_bodies[0][0].fields, file).subscribe(
          (s3_key: string) => {
            this._uploadService.completeUpload(s3_key).subscribe(
              () => {
                this.creator[side] = content_id; 
                this._endLoading(side); 
              },
              () => this._uploadError(side)
            )
          }, 
          () => this._uploadError(side)
        )
      },
      () => this._uploadError(side)
    )
  }

  private _uploadError(side: IDSide): void {
    this._appStateService.displayErrorModal = true; 
    this._endLoading(side); 
    switch(side) {
      case IDSide.FRONT: 
        this.setFileFront(undefined); 
        this.clearFrontFile.next(true); 
        break; 
      case IDSide.BACK: 
        this.setFileBack(undefined);  
        this.clearBackFile.next(true); 
        break;
      default: 
        break; 
    }
  }

  private _endLoading(side: IDSide): void {
    if (side === IDSide.FRONT) {
      this.isLoadingFront = false; 
      this.$isLoadingFront.next(false); 
    }
    else {
      this.isLoadingBack = false; 
      this.$isLoadingBack.next(false); 
    }
  }

  get isFormReady(): boolean {
    return this.formGroup.valid && !!this.frontFile && !!this.backFile && this.formGroup.controls['age_verified'].value === true;
  }
}
