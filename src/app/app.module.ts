import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ImageCropperModule } from 'ngx-image-cropper';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { Ng2ImgMaxModule } from 'ng2-img-max';

import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CarouselModule } from 'primeng/carousel';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { GalleryComponent } from './gallery/gallery/gallery.component';
import { ContentDetailComponent } from './content-detail/content-detail.component';
import { UploadComponent } from './upload/upload.component';
import { CookieService } from 'ngx-cookie-service';
import { ContentSelectorComponent } from './upload/content-selector/content-selector.component';

import { AuthInterceptor } from './services/auth.interceptor';
import { MessageService } from 'primeng/api';

declare global {
  interface Window {
    analytics: any;
  }
}

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    GalleryComponent,
    ContentDetailComponent,
    UploadComponent,
    ContentSelectorComponent,
  ],
  imports: [
    CarouselModule,
    InputTextareaModule,
    ReactiveFormsModule,
    ImageCropperModule,
    DialogModule,
    FormsModule,
    ScrollingModule,
    SharedModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ButtonModule,
    InputTextModule,
    InputSwitchModule, 
    InfiniteScrollModule,
    Ng2ImgMaxModule, 
    MessagesModule,
    MessageModule
  ],
  providers: [
    CookieService, 
    {
      provide : HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi   : true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
