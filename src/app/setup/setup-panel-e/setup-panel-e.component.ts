import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { COUNTRIES, STATES } from 'src/app/app.constants';
import { Country } from 'src/app/app.interface';
import { CreatorOptional } from '../setup';

import { SetupService } from '../setup.service';

@Component({
  selector: 'tattoo-setup-panel-e',
  templateUrl: './setup-panel-e.component.html',
  styleUrls: ['./setup-panel-e.component.scss']
})
export class SetupPanelEComponent implements OnInit {
  @Input() pageChange: Subject<number>; 
  @Input() index: number; 
  @Input() validList: boolean[]; 
  @Input() creator: CreatorOptional; 

  countries = COUNTRIES;
  states = STATES;
  selectedState: string; 
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
      address_line_1: [this.creator.address_line_1, Validators.required], 
      address_line_2: [this.creator.address_line_2], 
      city: [this.creator.city, Validators.required], 
      state: [this.creator.state, Validators.required], 
      zip: [this.creator.zip],
      country: [this._findCountry, Validators.required]
    })
    this.validList[this.index] = this.formGroup.valid;
    this.formGroup.valueChanges.subscribe(() => {
      this.validList[this.index] = this.formGroup.valid; 
    })
  }

  private get _findCountry(): Country {
    const selectedCode = !!this.creator.country ? this.creator.country : 'US'; 
    return this.countries.find(elem => elem.code === selectedCode);
  }

  displayError(controlName: string) {
    return SetupService.displayErrorMessage(this.formGroup, controlName); 
  }

  continue(): void {
    if (this.formGroup.valid) {
      this.creator.address_line_1 = this.formGroup.controls['address_line_1'].value; 
      this.creator.address_line_2 = this.formGroup.controls['address_line_2'].value; 
      this.creator.city = this.formGroup.controls['city'].value; 
      this.creator.state = this.formGroup.controls['state'].value; 
      this.creator.zip = this.formGroup.controls['zip'].value; 
      this.creator.country = (this.formGroup.controls['country'].value as Country); 
      SetupService.saveCreator(this.creator); 
    }
  }
}
