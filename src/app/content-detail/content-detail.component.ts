import { Component, OnInit } from '@angular/core';

import { Content } from 'src/app/shared/content/content.interface';
import { ContentDetailStateService } from './content-detail-state.service';

@Component({
  selector: 'tattoo-content-detail',
  templateUrl: './content-detail.component.html',
  styleUrls: ['./content-detail.component.scss']
})
export class ContentDetailComponent implements OnInit {
  content: Content; 
  name: string; 

  constructor(
    private detailState: ContentDetailStateService
  ) { }

  ngOnInit(): void {
    if (this.detailState.isContentSet) {
      this.content = this.detailState.content; 
      this.name = this.detailState.name; 
    }
  } 
}
