export enum ContentSize {
    SMALL = 'small',
    MEDIUM = 'medium',
    LARGE = 'large'
}

export interface Content {
    id: string; 
    creator: string; 
    body: string; 
    likes: number; 
    time_create: Date, 
    media: Media[]
}

export interface Media {
    sm: MediaSize, 
    md: MediaSize, 
    lg: MediaSize
}

export interface MediaSize {
    id: string; 
    size: string; 
    type: string; 
    url: string; 
}
