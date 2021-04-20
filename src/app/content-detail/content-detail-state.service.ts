import { Injectable } from '@angular/core';
import { Content } from 'src/app/shared/content/content.interface';

@Injectable({
  providedIn: 'root'
})
export class ContentDetailStateService {
  private _content: Content; 
  private _name: string; 

  constructor() { }

  setContent(content: Content, name: string): void {
    this._content = content; 
    this._name = name; 
  }

  get name(): string {
    return this._name;
  }

  get content(): Content {
    return this._content; 
  }

  isContentSet(): boolean {
    return !!this._content && !!this._name; 
  }
}
