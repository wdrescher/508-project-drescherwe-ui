import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppStateService } from '../services/app-state.service';

import { CreateParlorRequest, ParlorService } from './parlor.service';

@Component({
  selector: 'tatoo-parlor',
  templateUrl: './parlor.component.html',
  styleUrls: ['./parlor.component.scss']
})
export class ParlorComponent implements OnInit {
  joinFormGroup: FormGroup; 
  createFormGroup: FormGroup; 

  constructor(
    private _formBuilder: FormBuilder, 
    private _parlorService: ParlorService, 
    private _appStateService: AppStateService
  ) { }

  ngOnInit(): void {
    this.joinFormGroup = this._formBuilder.group({
      'parlor_id': ['', [Validators.pattern(/[0-9]*/g)]], 
    })

    this.createFormGroup = this._formBuilder.group({
      'name': ['', [Validators.required]], 
      'shop_commission': ['', Validators.required], 
      'address_line_1': ['', Validators.required], 
      'address_line_2': [''], 
      'city': ['', Validators.required], 
      'state': ['', [Validators.minLength(2), Validators.maxLength(2)]], 
      'zip': ['', [Validators.maxLength(5), Validators.minLength(5)]]
    })
  }

  createParlor(): void {
    const controls = this.createFormGroup.controls;
    let data: CreateParlorRequest = {
      name: controls["name"].value, 
      shop_commission: controls['shop_commission'].value, 
      address_line_1: controls['address_line_1'].value, 
      address_line_2: controls['address_line_2'].value, 
      city: controls['city'].value, 
      state: controls['state'].value, 
      zip: controls['zip'].value
    }
    this._parlorService.createParlor(data).subscribe(
      () => {
        
      }, 
      () => this._appStateService.displayErrorModal = true
    )
  }

  joinParlor(): void {

  }
}
