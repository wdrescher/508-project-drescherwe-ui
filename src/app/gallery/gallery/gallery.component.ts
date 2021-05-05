import { Component, OnInit } from '@angular/core';

import { ArtistService } from 'src/app/services/artist.service';
import { GalleryService } from '../gallery.service';
import { UserStateService } from 'src/app/services/user-state.service';
import { AppState, Artist, ArtistProfile, User } from 'src/app/app.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppStateService } from 'src/app/services/app-state.service';
import { BookingService } from 'src/app/services/booking.service';
import { Router } from '@angular/router';
import { FixedSizeVirtualScrollStrategy } from '@angular/cdk/scrolling';

interface ContentTracker {
  name: string; 
  content_id: string;
}

@Component({
  selector: 'tattoo-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  isResendEmailLoading = false;
  buttonText = "Resend"
  iconText = "";
  requestAppointmentForm: FormGroup; 
  displayArtistModal = false; 
  artistFormGroup: FormGroup; 

  submitted: boolean = false; 
  bookedArtist: ArtistProfile; 
  artists: ArtistProfile[] = [];

  feed: ContentTracker[] = []; 
  currentOffset = 0; 

  isLoadingRequest = false; 
  isLoading = true; 

  constructor(
    private _userStateService: UserStateService, 
    private _galleryService: GalleryService, 
    private _formBuilder: FormBuilder, 
    private _appStateService: AppStateService, 
    private _bookingService: BookingService, 
    private _router: Router, 
    private _artistService: ArtistService, 
  ) { }

  ngOnInit(): void {
    this.requestAppointmentForm = this._formBuilder.group({
      'design_description': ['', [Validators.required, Validators.maxLength(500)]]
    })

    this.artistFormGroup = this._formBuilder.group({
      'minimum_price': [''], 
      'max_bookings': ['']
    })

    this._galleryService.getArtists().subscribe(
      (res: ArtistProfile[]) => {
        this.artists = res.filter(elem => elem.profile_id != this._userStateService.profileId);
      }, 
      () => {}
    );
  }

  set displayBookingModal(input: boolean) {
    this.bookedArtist = undefined; 
  }

  get displayBookingModal(): boolean { 
    return !!this.bookedArtist;
  }

  bookArtist(artist: ArtistProfile): void {
    this.bookedArtist =  artist;
  } 

  get awaitingVerification(): boolean {
    return this._userStateService.awaitingVerification;
  }

  onSubmitRequest(): void {
    if (this.requestAppointmentForm.valid) {
      this.isLoadingRequest = true;
      let description = this.requestAppointmentForm.controls['design_description'].value;
      this._galleryService.requestAppointment(this.bookedArtist.profile_id, description).subscribe(
        () => {
          this.isLoadingRequest = false;
          this.submitted = true; 
        }, 
        () => {
          this._appStateService.displayErrorModal = true; 
        }
      )
    }
  }

  hasBooking(artist: ArtistProfile): boolean {
    const artistId =  artist.profile_id; 
    for (let booking of this._bookingService.loadedBookings) {
      if (artistId === booking.artist_id) {
        return true; 
      }
    }
    return false;
  }

  goToAppointments(): void {
    this._router.navigateByUrl(AppState.BOOKINGS)
  }

  onArtistSubmit(): void {
    const minimumPrice = this.artistFormGroup.controls['minimum_price'].value; 
    const maxBookings = this.artistFormGroup.controls['max_bookings'].value; 
    this._artistService.createArtist(minimumPrice, maxBookings).subscribe(
      () => {
        this.displayArtistModal = false; 
      }
    ); 
  }

  get isArtist(): boolean { 
    return this._userStateService.isArtist;
  }
}
