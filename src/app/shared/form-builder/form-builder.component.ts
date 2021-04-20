import { Component, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { SettingItem } from 'src/app/app.interface';
import { SetupService } from 'src/app/setup/setup.service';

@Component({
  selector: 'tattoo-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss']
})
export class FormBuilderComponent implements OnInit {
  @Input() formGroup: FormGroup; 
  @Input() settings: SettingItem[]

  constructor() { }

  ngOnInit(): void {
  }

  displayError(formGroup: FormGroup, controlName: string): boolean {
    return SetupService.displayErrorMessage(formGroup, controlName);
  }
}
