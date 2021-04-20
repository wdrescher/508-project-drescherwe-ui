import { Component, HostListener, Input, OnInit } from '@angular/core';

import { Content, Media } from 'src/app/shared/content/content.interface';
import { FileType } from 'src/app/upload/upload.interface';
import { ContentSize } from './content.interface';

@Component({
  selector: 'tattoo-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  @Input() content: Content;
  @Input() size: ContentSize;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.width = window.innerWidth;
  }

  responsiveOptions = [
    {
      breakpoint: '600px',
      numVisible: 1,
      numScroll: 1
    },
  ]

  mediaLength = 0; 
  width: number; 
  isVideo: boolean = false; 
  constructor() { }

  ngOnInit(): void {
    this.width = window.innerWidth;
    this.mediaLength = this.content.media.length; 

    if (this.isDefined) {
      let size: Media = this.content.media[0]; 
      this.isVideo = size.lg.type === FileType.VIDEO;
    }
  }

  get isDefined(): boolean {
    return !!this.content && !!this.content.media && !!this.content.media[0]; 
  }

  get isLocked(): boolean {
    return !this.isDefined; 
  }

  get displaySmall(): boolean {
    return (!!this.small && this.width < 400); 
  }

  get displayMedium(): boolean {
    return (!!this.medium && (this.width >= 400 && this.width < 1000)) || !this.small;
  }

  get displayLarge(): boolean {
    return (!!this.large && this.width >= 1000) || !this.medium; 
  }

  get small(): string {
    return this.isDefined && !!this.content.media[0].sm ? this.content.media[0].sm.url : '';
  }

  get medium(): string {
    return this.isDefined  && !!this.content.media[0].md ? this.content.media[0].md.url : '';
  }

  get large(): string {
    return this.isDefined  && !!this.content.media[0].lg ? this.content.media[0].lg.url : '';
  }

  get description(): string {
    return this.content.body;
  }

  get strictSizing(): boolean {
    return !!this.size; 
  }
}
