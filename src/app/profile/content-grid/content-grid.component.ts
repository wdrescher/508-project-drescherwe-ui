import { Component, Input, OnInit } from '@angular/core';
import { AppStateService } from 'src/app/services/app-state.service';
import { GetUserPostsSuccessResponse } from 'src/app/services/content.interface';

import { ContentService } from 'src/app/services/content.service';
import { Content } from 'src/app/shared/content/content.interface';

@Component({
  selector: 'tattoo-content-grid',
  templateUrl: './content-grid.component.html',
  styleUrls: ['./content-grid.component.scss']
})
export class ContentGridComponent implements OnInit {
  @Input() username: string; 
  isLoading: boolean = true; 

  private currentOffest: number = 0; 
  private pageSize: number = 25; 

  posts: Content[] = []; 

  constructor(
    private contentService: ContentService, 
    private appStateService: AppStateService
  ) {}

  ngOnInit(): void {
    this.loadContent();
  }

  loadContent(): void {
    this.contentService.getUserPosts(this.username, this.currentOffest, this.pageSize).subscribe(
      (res: GetUserPostsSuccessResponse) => {
        this.isLoading = false; 
        this.currentOffest = res.pagination_next.offset;
        this.posts = this.posts.concat(res.content);
      }, 
      () => {
        this.isLoading = false; 
        this.appStateService.displayErrorModal = true; 
      }
    )
  }
}
