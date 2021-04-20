import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'tattoo-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() author: string; 
  @Input() body: string; 

  constructor() { }

  ngOnInit(): void {
  }

}
