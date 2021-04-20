import { Content } from 'src/app/shared/content/content.interface';
import { Paginator } from '../app.interface';

export interface TileData {
    name: string; 
    content?: Content
}

export interface FeedResponse {
    feed: ContentReference[], 
    pagination_next: Paginator
}

export interface ContentReference {
    username: string; 
    content_id: string;
}