import { Validators } from "@angular/forms";

export interface Country {
    name: string; 
    code: string; 
}

export interface InputControl {
    output: any;
    label: string;
    placeholder?: string;
    type: InputType;
}

export interface Paginator {
    offset: number; 
    limit: number;
}

export interface SettingItem {
    label: string;
    previousValue: any;
    formControlName: string; //link to value in settings interface
    validators: Validators[];
    type: string;
    options?: any[];
    errorCode: string;
    hideField?: boolean;
    httpField?: boolean;
    isCountry?: boolean;
    readOnly?: boolean; 
  }

export enum InputType {
    TEXT = 'text',
    PASSWORD = 'password',
    EMAIL = 'email'
}

export interface Settings {
    temp:string; 
}

export interface User {
    username: string; 
    profile_image_content_id: string;
    email: string; 
    first_name: string; 
    last_name: string; 
    country: string; 
    state_or_province: string; 
    city: string; 
    street_address: string; 
    street_address_line_2: string; 
    settings?: Settings; 
    twitter_url: string; 
    instagram_url: string; 
    bio: string; 
    id_front_url: string;
    id_back_url: string;
}

export enum AppState {
    LOGIN = '',
    SIGNUP = 'signup',
    GALLERY = 'gallery',
    EMAIL_VERIFICATION = 'verify',
    RESET_PASSWORD = 'reset-password',
    SET_PASSWORD = "set-password",
    FORGOT_PASSWORD = 'forgot-password',
    HOME = 'gallery',
    DETAIL = 'detail', 
    UPLOAD = "upload", 
    RESEND_EMAIL = "resend-email",
    SETUP = "setup", 
    PROFILE = 'profile',
    CURRENT_USER = 'user', 
    SETTINGS = "settings",
    ACCOUNT_SETTINGS = 'account',
    PASSWORD_SETTINGS = 'password', 
    BILLING_SETTINGS = 'billing', 
    ADDRESS_SETTINGS = 'address'
}

export enum FileType { 
    IMG = "image", 
    VIDEO = "video",
    USER_DATA = "user_data",
}
