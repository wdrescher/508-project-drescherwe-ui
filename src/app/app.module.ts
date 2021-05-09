import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { CarouselModule } from 'primeng/carousel';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { GalleryComponent } from './gallery/gallery/gallery.component';
import { CookieService } from 'ngx-cookie-service';

import { AuthInterceptor } from './services/auth.interceptor';
import { BookingComponent } from './booking/booking.component';
import { ParlorComponent } from './parlor/parlor.component';
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
    BookingComponent,
    ParlorComponent
  ],
  imports: [
    InputTextareaModule,
    ReactiveFormsModule,
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
    InfiniteScrollModule,
    CardModule,
    TagModule,
    TooltipModule,
    InputNumberModule, 
    CalendarModule,
    CarouselModule, 
    OverlayPanelModule, 
    ConfirmDialogModule,
    ToastModule
  ],
  providers: [
    CookieService, 
    {
      provide : HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi   : true,
    },
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
