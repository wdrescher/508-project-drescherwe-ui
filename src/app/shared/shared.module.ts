import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton'; 
import { CarouselModule } from 'primeng/carousel';

import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls'

import { ClickOutsideModule } from 'ng-click-outside';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LogoComponent } from './logo/logo.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ContentComponent } from './content/content.component';
import { AvatarComponent } from './avatar/avatar.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { PlayerComponent } from './player/player.component';
import { IconMessageComponent } from './icon-message/icon-message.component'; 
import { TileComponent } from './tile/tile.component';
import { FormBuilderComponent } from './form-builder/form-builder.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { UsernameComponent } from './username/username.component';
import { SkeletonComponent } from './skeleton/skeleton.component';
import { MediaComponent } from './media/media.component';
import { CommentComponent } from './comment/comment.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LogoComponent,
    NavigationComponent,
    ContentComponent,
    AvatarComponent,
    FileUploadComponent, 
    PlayerComponent, 
    IconMessageComponent, 
    TileComponent, 
    FormBuilderComponent, 
    UsernameComponent, 
    SkeletonComponent, 
    MediaComponent, CommentComponent
  ],
  imports: [
    CommonModule,
    ButtonModule, 
    VgCoreModule, 
    VgControlsModule, 
    ReactiveFormsModule,
    InputTextModule,
    DropdownModule, 
    SkeletonModule,
    CarouselModule, 
    ClickOutsideModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    LogoComponent, 
    AvatarComponent, 
    ContentComponent, 
    FileUploadComponent, 
    PlayerComponent, 
    IconMessageComponent, 
    TileComponent, 
    FormBuilderComponent, 
    UsernameComponent, 
    SkeletonComponent
  ]
})
export class SharedModule { }
