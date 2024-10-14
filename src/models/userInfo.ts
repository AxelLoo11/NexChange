import { PostInfo } from "./postInfo";

export interface ContactInfo {
    id: string;
    name: string;
    address: string;
    postalCode: string;
    phoneNumber: string;
    isDefault: boolean;
}

export interface UserInfo {
    id: string;
    nickname: string;
    imageUrl: string; // NO. of the public images avatar ...
    contacts: ContactInfo[];
    wishlist: PostInfo[];
    postHistory: PostInfo[];
}