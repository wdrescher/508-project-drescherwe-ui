import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'tattoo-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  @Input() file?: File; 
  @Input() videoUrl?: string; 
  @Input() size: number; 
  
  safeSrc: SafeUrl; 
  source: string; 

  constructor(
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    if (!!this.file) {
      if (this.file.type.indexOf('video') < 0) {
        console.log("Error: image uploaded to player")
      }
      else {
        this.videoUrl = URL.createObjectURL(this.file);
        this.safeSrc = this.sanitizer.bypassSecurityTrustUrl(this.videoUrl); 
      }
    }
    else {
      this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.videoUrl); 
    }
  }
}
