export interface InitiateUploadBody {
    type: UploadType;
    payload_metadata: UploadPayload[];
}

export interface UploadPayload {
    file_type: FileType; 
    description: string; 
    display_rank: number; 
}

export interface InitiateUploadSuccessResponse {
    content_id: string;
    upload_bodies: UploadDestination[][]
}

export interface UploadDestination {
    fields: any, 
    url: string
}

export enum UploadType {
    CONTENT = "content", 
    DOCUMENT = "user_data"
}

export enum FileType {
    IMAGE = "image", 
    VIDEO = "video"
}

export interface CompleteUploadBody {
    s3_key: string; 
}

export interface CompleteUploadSuccessResponse {
    status: string; 
}