import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { CreatorOptional } from '../setup';
import { SetupService } from '../setup.service';

@Component({
  selector: 'tattoo-setup-panel-c',
  templateUrl: './setup-panel-c.component.html',
  styleUrls: ['./setup-panel-c.component.scss']
})
export class SetupPanelCComponent implements OnInit {
  @Input() pageChange: Subject<number>; 
  @Input() index: number; 
  @Input() validList: boolean[]; 
  @Input() creator: CreatorOptional;
  
  checked: boolean = false; 

  formGroup: FormGroup; 
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
      age_verified: [false, Validators.required],
    })
    this.validList[this.index] = false; 
    this.formGroup.valueChanges.subscribe(() => {
      this.validList[this.index] = this.formGroup.controls['age_verified'].value === true; 
    })
  }

  displayError(controlName: string) {
    return SetupService.displayErrorMessage(this.formGroup, controlName); 
  }

  continue(): void {
    if (this.formGroup.valid) {
      this.creator.age_verified = this.formGroup.controls["age_verified"].value; 
      SetupService.saveCreator(this.creator); 
    }
  }
}
