import { OrderInfo, UserDetail } from "@/models/orderInfo";

const mockUserDetail1: UserDetail = {
    id: "testuser003",
    name: "Chris",
    address: "123 Main St",
    postalCode: "123654",
    contactNumber: "123-456-7890"
};

const mockUserDetail2: UserDetail = {
    id: "testuser005",
    name: "Bob",
    address: "123 Main St",
    postalCode: "123654",
    contactNumber: "123-456-7890"
};

const mockUserDetail3: UserDetail = {
    id: "testuser001",
    name: "Mike",
    address: "123 Main St",
    postalCode: "123654",
    contactNumber: "123-456-7890"
};

const mockUserDetail4: UserDetail = {
    id: "testuser002",
    name: "Amily",
    address: "123 Main St",
    postalCode: "123654",
    contactNumber: "123-456-7890"
};

const mockUserDetail5: UserDetail = {
    id: "testuser004",
    name: "Samasha",
    address: "123 Main St",
    postalCode: "123654",
    contactNumber: "123-456-7890"
};

export const mockOrder1: OrderInfo = {
    id: "testorder001",
    refPostId: "test-sold-post-001",
    refSeller: mockUserDetail2,
    refBuyer: mockUserDetail1,
    refPostTitle: "Sold Post 1",
    refPostShortcut: "https://via.placeholder.com/300",
    refPostPrice: 20.5,
    createdAt: new Date(2024, 9, 8, 12, 30), // October 8, 2024, 12:30 PM
    updatedAt: new Date(2024, 9, 8, 12, 45),
    status: "UNPAID"
};

export const mockOrder2: OrderInfo = {
    id: "testorder002",
    refPostId: "test-sold-post-002",
    refSeller: mockUserDetail3,
    refBuyer: mockUserDetail1,
    refPostTitle: "Sold Post 2",
    refPostShortcut: "https://via.placeholder.com/300",
    refPostPrice: 50,
    createdAt: new Date(2024, 9, 8, 10, 30), // October 8, 2024, 12:30 PM
    updatedAt: new Date(2024, 9, 8, 12, 45),
    status: "EXPIRED"
};

export const mockOrder3: OrderInfo = {
    id: "testorder003",
    refPostId: "test-sold-post-003",
    refSeller: mockUserDetail4,
    refBuyer: mockUserDetail1,
    refPostTitle: "Sold Post 3",
    refPostShortcut: "https://via.placeholder.com/300",
    refPostPrice: 50,
    createdAt: new Date(2024, 9, 5, 12, 30), // October 8, 2024, 12:30 PM
    updatedAt: new Date(2024, 9, 5, 12, 45),
    status: "PAID BUT NOT SHIPPED"
};

export const mockOrder4: OrderInfo = {
    id: "testorder004",
    refPostId: "test-sold-post-004",
    refSeller: mockUserDetail5,
    refBuyer: mockUserDetail1,
    refPostTitle: "Sold Post 4",
    refPostShortcut: "https://via.placeholder.com/300",
    refPostPrice: 50,
    createdAt: new Date(2024, 9, 4, 12, 30), // October 8, 2024, 12:30 PM
    updatedAt: new Date(2024, 9, 4, 12, 45),
    status: "COMPLETED"
};

export const ChrisOrderList:OrderInfo[] = [mockOrder1, mockOrder2, mockOrder3, mockOrder4];