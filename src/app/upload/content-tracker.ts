export interface ContentTracker { 
    file?: File, 
    croppedImage?: MediaSizes,
    isLoading?: boolean
}

export interface MediaSizes {
    sm?: File, 
    md?: File, 
    lg: File
}
  
export enum FileSize {
    MEDIUM = "md", 
    SMALL = "sm", 
    LARGE = "lg"
}

export interface FileSizeDefiniton {
    sm: Dimension,
    md: Dimension, 
    lg: Dimension
}

export interface Dimension {
    width: number; 
    height: number
}

export const FILE_SIZE: FileSizeDefiniton = {
    sm: {
        width: 320, 
        height: 400
    }, 
    md: {
        width: 640, 
        height: 800
    }, 
    lg: {
        width: 1024, 
        height: 1080
    }
}