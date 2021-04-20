import { Component, Input, OnInit } from '@angular/core';
import { AppStateService } from 'src/app/services/app-state.service';

import { SubscriptionService } from './subscription.service';

@Component({
  selector: 'tattoo-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {
  @Input() username: string; 
  isLoading = true; 

  subscribed: boolean = false;
  constructor(
    private _subscriptionService: SubscriptionService, 
    private _appStateService: AppStateService
  ) { }

  ngOnInit(): void {
    this._subscriptionService.isSubscribed(this.username).subscribe(
      res => {
        this.subscribed = res; 
        this.isLoading = false; 
      }, 
      () => {
        this.subscribed = false; 
        this.isLoading = false; 
      }
    )
  }

  subscribe(): void {
    this._subscriptionService.subscribe(this.username).subscribe(
      () => {
        this.subscribed = true; 
      }, 
      () => {
        this._error(); 
      }
    )
  }

  unsubscribe(): void { 
    this._subscriptionService.unsubscribe(this.username).subscribe(
      () => {
        this.subscribed = false; 
      }, 
      () => {
        this._error(); 
      }
    )
  }

  private _error(): void {
    this._appStateService.displayErrorModal = true; 
  }
}
