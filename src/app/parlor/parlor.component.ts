import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Artist, Parlor } from '../app.interface';
import { AppStateService } from '../services/app-state.service';
import { ArtistService } from '../services/artist.service';

import { CreateParlorRequest, ParlorService } from './parlor.service';

@Component({
  selector: 'tatoo-parlor',
  templateUrl: './parlor.component.html',
  styleUrls: ['./parlor.component.scss']
})
export class ParlorComponent implements OnInit {
  joinFormGroup: FormGroup; 
  createFormGroup: FormGroup; 
  editParlor: FormGroup; 

  private _artist: Artist; 
  parlor: Parlor; 

  constructor(
    private _formBuilder: FormBuilder, 
    private _parlorService: ParlorService, 
    private _appStateService: AppStateService, 
    private _artistService: ArtistService
  ) { }

  ngOnInit(): void {
    this._artistService.currentArtist().subscribe(
      (res: Artist) => {
        this._artist = res;
        this._parlorService.fetchParlor(res.parlor_id).subscribe(
          (parlor: Parlor) => {
            this.parlor = parlor; 
            this.editParlor = this._formBuilder.group({
              'name': [parlor.name, [Validators.required]], 
              'shop_commission': [parlor.shop_commission, Validators.required], 
              'address_line_1': [parlor.address_line_1, Validators.required], 
              'address_line_2': [parlor.address_line_2], 
              'city': [parlor.city, Validators.required], 
              'state': [parlor.state, [Validators.minLength(2), Validators.maxLength(2)]], 
              'zip': [parlor.zip, [Validators.maxLength(5), Validators.minLength(5)]]
            })
          }, 
          () => {
            this._appStateService.displayErrorModal = true; 
          }
        )
      }, 
      () => {
        this._appStateService.displayErrorModal = true;
      }
    )

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
      (res: Parlor) => {
        this._artist.parlor_id = res.parlor_id;
      }, 
      () => this._appStateService.displayErrorModal = true
    )
  }

  joinParlor(): void {
    const parlor_id = this.joinFormGroup.controls['parlor_id'].value;
    this._parlorService.joinParlor(parlor_id).subscribe(
      () => {

      }, 
      () => this._appStateService.displayErrorModal = true
    )
  }

  get hasParlor(): boolean {
    return !!this._artist.parlor_id;
  }

  get isManager(): boolean {
    return !!this._artist && this._artist.is_manager
  }
}
