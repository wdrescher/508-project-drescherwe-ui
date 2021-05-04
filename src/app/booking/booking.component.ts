import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { timestamp } from 'rxjs/operators';
import { Booking } from '../app.interface';
import { AppStateService } from '../services/app-state.service';
import { BookingService, ListBookingsSuccessResponse } from '../services/booking.service';
import { UserStateService } from '../services/user-state.service';

@Component({
  selector: 'tatoo-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  isLoading: boolean = true; 
  requests: Booking[]; 
  currentBooking: Booking; 
  formGroup: FormGroup; 
  timeFormGroup: FormGroup; 

  private _displayApprovalModal = false; 
  private _displayTimeSlotModal = false; 

  constructor(
    private _bookingService: BookingService, 
    private _appStateService: AppStateService, 
    private _userStateService: UserStateService, 
    private _formBuilder: FormBuilder
  ) { }

    calendars=['date_1', 'date_2', 'date_3']

  ngOnInit(): void {
    this.formGroup = this._formBuilder.group({
      'price': ['', [Validators.required, Validators.max(10000), Validators.min(1)]]
    })

    this.timeFormGroup = this._formBuilder.group({
      'date_1': ['', [Validators.required]], 
      'date_2': ['', [Validators.required]], 
      'date_3': ['', [Validators.required]]
    })

    this._bookingService.listBookings().subscribe(
      () => {
        this.isLoading = false; 
      }, 
      () => {
        this.isLoading = false; 
        this._appStateService.displayErrorModal = true; 
      }
    ); 

    this._bookingService.listRequests().subscribe(
      (res: ListBookingsSuccessResponse) => {
        this.requests = res.bookings
      }
    )
  }

  get bookings(): Booking[] {
    return this._bookingService.loadedBookings; 
  }

  labelText(bool: boolean): string {
    return bool ? 'Approved' : 'Pending'
  }

  tooltipMessage(type: "price" | "description", booking: Booking): string {
    if (this._userStateService.profileId === booking.client_id) {
      if (type === "price" && (!booking.price || booking.price == 0)) {
        return "Artist has not set price"
      }
      else if (type === "description" && !booking.design_approved) {
        return "Artist has not accepted appointment"
      }
    }
    else {

    }
  }

  requestMessage(type: "price" | "description", booking: Booking): string {
    if (this._userStateService.profileId === booking.artist_id) {
      if (type === "price" && (!booking.price || booking.price == 0)) {
        return "Approved request to move forward"
      }
      else if (type === "description" && !booking.design_approved) {
        return "Approve request to move forward"
      }
      if (type === "price" && booking.price > 0 && booking.price_approved == false) {
        return "Awaiting customer approval"
      }
    }
  }

  approveBooking(booking: Booking): void {
    this.displayApprovalModal = true; 
    this.currentBooking = booking;
  }

  get displayApprovalModal(): boolean {
    return this._displayApprovalModal;
  }

  set displayApprovalModal(input: boolean) {
    if (!input) {
      this.currentBooking = undefined; 
    }
    this._displayApprovalModal = input; 
  }

  get displayTimeSlotModal(): boolean { 
    return this._displayTimeSlotModal; 
  }

  set displayTimeSlotModal(input: boolean) {
    if (!input) { 
      this.currentBooking = undefined
    }
    this._displayTimeSlotModal = input; 
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      const price = this.formGroup.controls['price'].value;
      this._bookingService.setPrice(this.currentBooking.booking_id, price).subscribe(
        () => {
          this.currentBooking.design_approved = true; 
          this.currentBooking.price = price;
          this.displayApprovalModal = false; 
        }, 
        () => {
          this._appStateService.displayErrorModal = true; 
        }
      ); 
    }
  }

  approvePrice(booking: Booking): void {
    this.currentBooking = booking; 
    this.displayTimeSlotModal = true;  
  }
}
