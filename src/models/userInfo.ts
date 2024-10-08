import { PostInfo } from "./postInfo";

export interface ContactInfo {
    name: string;
    address: string;
    postalCode: string;
    phoneNumber: string;
    isDefault: boolean;
}

export interface UserInfo {
    nickname: string;
    email: string;
    imageUrl: string; // NO. of the public images avatar ...
    contacts: ContactInfo[];
    wishlist: PostInfo[];
    postHistory: PostInfo[];
}