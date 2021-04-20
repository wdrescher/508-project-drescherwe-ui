import { Country } from "../app.interface";

export interface CreatorOptional  {
    first_name?: string; 
    last_name?: string; 
    display_name?: string; 
    bio?: string; 
    age_verified?: boolean;
    twitter_url?: string; 
    instagram_url?: string; 
    address_line_1?: string; 
    address_line_2?: string; 
    city?: string; 
    state?: string; 
    zip?: string; 
    country?: Country; 
    date_of_birth?: string; 
    id_front_url?: string; 
    id_back_url?: string;
}

export enum IDSide {
    FRONT = 'id_front_url', 
    BACK = 'id_back_url'
}

