export interface UserDetail {
    id: string;
    name: string;
    address: string;
    postalCode: string;
    contactNumber: string;
}

export interface OrderInfo {
    id: string;
    refPostId: string;
    refSeller: UserDetail;
    refBuyer: UserDetail;
    refPostTitle: string;
    refPostShortcut: string;
    refPostPrice: number;
    createdAt: Date;
    updatedAt: Date;
    status: string; // enum
};