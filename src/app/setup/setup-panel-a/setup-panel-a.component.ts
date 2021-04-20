import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { CreatorOptional } from '../setup';

import { SetupService } from '../setup.service';

@Component({
  selector: 'tattoo-setup-panel-a',
  templateUrl: './setup-panel-a.component.html',
  styleUrls: ['./setup-panel-a.component.scss']
})
export class SetupPanelAComponent implements OnInit {
  @Input() pageChange: Subject<number>; 
  @Input() index: number; 
  @Input() validList: boolean[]; 
  @Input() creator: CreatorOptional; 

  formGroup: FormGroup; 
  displayName: string = "jane-doe"; 
  constructor(
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.pageChange.subscribe((pageIndex) => {
      if (pageIndex == this.index) {
        this.continue(); 
      }
    })
    if (!!this.creator && !!this.creator.display_name) {
      this.displayName = this.creator.display_name
    }
    this.formGroup = this._formBuilder.group({
      first_name: [this.creator.first_name, Validators.required], 
      last_name: [this.creator.last_name, Validators.required],
      display_name: [this.creator.display_name, Validators.pattern('([0-9]|[a-z]|[A-Z]|-)+')]
    })
    this.formGroup.controls['display_name'].valueChanges.subscribe((change) => {
      this.displayName = change; 
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
      this.creator.first_name = this.formGroup.controls["first_name"].value; 
      this.creator.last_name = this.formGroup.controls["last_name"].value
      this.creator.display_name = this.formGroup.controls["display_name"].value
      SetupService.saveCreator(this.creator); 
    }
  }

  get currentDisplayName(): string {
    return `https://peek.com/${this.displayName}`;
  }
}
