import { Paginator } from '../app.interface';
import { Content } from '../shared/content/content.interface';

export interface GetUserPostsSuccessResponse {
    content: Content[], 
    pagination_next: Paginator
}
