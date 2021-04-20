import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProgressBarModule } from 'primeng/progressbar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';

import { SetupRoutingModule } from './setup-routing.module';
import { SetupPageComponent } from './setup-page/setup-page.component';
import { SetupPanelAComponent } from './setup-panel-a/setup-panel-a.component';
import { SetupPanelBComponent } from './setup-panel-b/setup-panel-b.component';
import { SetupPanelCComponent } from './setup-panel-c/setup-panel-c.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SetupPanelDComponent } from './setup-panel-d/setup-panel-d.component';
import { SetupPanelEComponent } from './setup-panel-e/setup-panel-e.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { SetupPanelFComponent } from './setup-panel-f/setup-panel-f.component';

@NgModule({
  declarations: [SetupPageComponent, SetupPanelAComponent, SetupPanelBComponent, SetupPanelCComponent, SetupPanelDComponent, SetupPanelEComponent, SetupPanelFComponent],
  imports: [
    FormsModule,
    ToggleButtonModule,
    SharedModule,
    ScrollingModule,
    InputMaskModule,
    CommonModule,
    ReactiveFormsModule,
    SetupRoutingModule, 
    ButtonModule, 
    ProgressBarModule, 
    InputTextModule,  
    DropdownModule,
  ], 
  exports: [
    SetupPanelAComponent
  ]
})
export class SetupModule { }
