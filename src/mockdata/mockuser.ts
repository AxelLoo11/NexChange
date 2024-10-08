// dummy user info data used for test ui design ...
import { UserInfo } from "@/models/userInfo"; 
import { mockPost1, mockPost10, mockPost11, mockPost12, mockPost2, mockPost3, mockPost4, mockPost5, mockPost6, mockPost7, mockPost8, mockPost9 } from "./mockpost";

export const mockUser1: UserInfo = {
    nickname: 'Mike',
    imageUrl: '01',
    wishlist: [],
    postHistory: [
        mockPost1, mockPost2, mockPost3
    ],
    contacts: [
        { name: 'Mike Waston', address: '123 Main St', postalCode: '123654', phoneNumber: '123-456-7890', isDefault: true }
    ],
    id: "testuser001",
};

export const mockUser2: UserInfo = {
    nickname: 'Amily',
    imageUrl: '02',
    wishlist: [
        mockPost2,
        mockPost3
    ],
    postHistory: [
        mockPost4, mockPost5
    ],
    contacts: [
        { name: 'Amily Doyle', address: '123 Main St', postalCode: '123654', phoneNumber: '123-456-7890', isDefault: true }
    ],
    id: "testuser002",
};

export const mockUser3: UserInfo = {
    nickname: 'Chris',
    imageUrl: '03',
    wishlist: [
        mockPost2, mockPost11
    ],
    postHistory: [
        mockPost6, mockPost7, mockPost8, mockPost9
    ],
    contacts: [
        { name: 'Chris Hotch 1', address: '123 Main St', postalCode: '123654', phoneNumber: '123-456-7890', isDefault: true },
        { name: 'Chris Hotch 2', address: '888 Main St', postalCode: '001214', phoneNumber: '123-456-7890', isDefault: false }
    ],
    id: "testuser003",
};

export const mockUser4: UserInfo = {
    nickname: 'Samasha',
    imageUrl: '04',
    wishlist: [],
    postHistory: [
        mockPost10, mockPost11
    ],
    contacts: [
        { name: 'Samasha Mogan', address: '123 Main St', postalCode: '123654', phoneNumber: '123-456-7890', isDefault: true }
    ],
    id: "testuser004",
};

export const mockUser5: UserInfo = {
    nickname: 'Bob',
    imageUrl: '05',
    wishlist: [],
    postHistory: [
        mockPost12
    ],
    contacts: [
        { name: 'Bob Reid', address: '123 Main St', postalCode: '123654', phoneNumber: '123-456-7890', isDefault: true }
    ],
    id: "testuser005",
};

export const mockUsers: UserInfo[] = [mockUser1, mockUser2, mockUser3, mockUser4, mockUser5];