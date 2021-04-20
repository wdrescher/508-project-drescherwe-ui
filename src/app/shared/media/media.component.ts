import { Component, HostListener, Input, OnInit } from '@angular/core';

import { Content, Media } from 'src/app/shared/content/content.interface';
import { FileType } from 'src/app/upload/upload.interface';
import { ContentSize } from 'src/app/shared/content/content.interface';

@Component({
  selector: 'tattoo-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit {
  @Input() media: Media;
  @Input() size?: ContentSize;
  @Input() description: string; 

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.width = window.innerWidth;
  }

  width: number; 
  isVideo: boolean = false; 
  constructor() { }

  ngOnInit(): void {
    this.width = window.innerWidth;

    if (this.isDefined) {
      this.isVideo = this.media.lg.type === FileType.VIDEO;
    }
  }

  get isDefined(): boolean {
    return !!this.media;
  }

  get isLocked(): boolean {
    return !this.isDefined; 
  }

  get displaySmall(): boolean {
    return (!!this.small && this.width < 400) || (!this.large && !this.medium);  
  }

  get displayMedium(): boolean {
    return (!!this.medium && (this.width >= 400 && this.width < 1000)) || (!this.large && !this.small);
  }

  get displayLarge(): boolean {
    return (!!this.large && this.width >= 1000) || (!this.medium && !this.small); 
  }

  get small(): string {
    return this.isDefined && !!this.media.sm ? this.media.sm.url : undefined;
  }

  get medium(): string {
    return this.isDefined  && !!this.media.md ? this.media.md.url : undefined;
  }

  get large(): string {
    return this.isDefined  && !!this.media.lg ? this.media.lg.url : undefined;
  }

  get strictSizing(): boolean {
    return !!this.size; 
  }
}
