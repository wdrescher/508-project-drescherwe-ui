import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { CreatorOptional } from '../setup';
import { SetupService } from '../setup.service';

@Component({
  selector: 'tattoo-setup-panel-b',
  templateUrl: './setup-panel-b.component.html',
  styleUrls: ['./setup-panel-b.component.scss']
})
export class SetupPanelBComponent implements OnInit {
  @Input() pageChange: Subject<number>; 
  @Input() index: number; 
  @Input() validList: boolean[]; 
  @Input() creator: CreatorOptional; 

  formGroup: FormGroup; 
  file: File; 
  constructor(
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.pageChange.subscribe((pageIndex) => {
      if (pageIndex == this.index) {
        this.continue(); 
      }
    })
    this.formGroup = this._formBuilder.group({
      bio: [this.creator.bio, Validators.maxLength(60)],
    })
    this.validList[this.index] = this.formGroup.valid;
    this.formGroup.valueChanges.subscribe(() => {
      this.validList[this.index] = this.formGroup.valid; 
    })
  }

  displayError(controlName: string) {
    return SetupService.displayErrorMessage(this.formGroup, controlName); 
  }

  continue(): void {
    if (this.formGroup.valid) {
      this.creator.bio = this.formGroup.controls["bio"].value; 
      SetupService.saveCreator(this.creator); 
    }
  }

  setFile(file) {
    this.file = file; 
  }
}
