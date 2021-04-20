import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { CreatorOptional } from '../setup';

import { SetupService } from '../setup.service';

@Component({
  selector: 'tattoo-setup-panel-d',
  templateUrl: './setup-panel-d.component.html',
  styleUrls: ['./setup-panel-d.component.scss']
})
export class SetupPanelDComponent implements OnInit {
  @Input() pageChange: Subject<number>; 
  @Input() index: number; 
  @Input() validList: boolean[]; 
  @Input() creator: CreatorOptional; 

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
      twitter_url: [this.creator.twitter_url, Validators.pattern(this.linkRegex("twitter"))], 
      instagram_url: [this.creator.instagram_url, Validators.pattern(this.linkRegex("instagram"))],
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
    this.creator.twitter_url = this.formGroup.controls["twitter_url"].value; 
    if (!!this.creator.twitter_url && this.creator.twitter_url.indexOf("http") < 0) {
      this.creator.twitter_url = `https://${this.creator.twitter_url}`
    }

    this.creator.instagram_url = this.formGroup.controls["instagram_url"].value
    if (!!this.creator.instagram_url && this.creator.instagram_url.indexOf("http") < 0) {
      this.creator.instagram_url = `https://${this.creator.instagram_url}`
    }
    SetupService.saveCreator(this.creator); 
  }

  linkRegex(host: string) {
    return new RegExp(`^((https*:\/\/)?(www\.)?${host}\.com.*)`)
  }
}
