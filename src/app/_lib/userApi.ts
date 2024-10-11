import { ChrisOrderList } from "@/mockdata/mockorder";
import { mockUsers } from "@/mockdata/mockuser";
import { OrderInfo } from "@/models/orderInfo";
import { UserInfo } from "@/models/userInfo";

// Function to fetch user information from the API
export const fetchUserInfo = async (userId: string): Promise<UserInfo> => {
  try {
    //   const response = await fetch(`/api/users/${userId}`); // Replace with your actual API endpoint

    //   if (!response.ok) {
    //     throw new Error('Failed to fetch user info');
    //   }

    //   const data: UserInfo = await response.json();
    //   return data;

    const dummydata: UserInfo = mockUsers.find(
      (u) => u.id === userId
    ) as UserInfo;
    return dummydata;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error; // Rethrow the error to handle it later
  }
};

export const fetchUserOrders = async (userId: string): Promise<OrderInfo[]> => {
  try {
    //   const response = await fetch(`/api/orders/${userId}`); // Replace with your actual API endpoint
    //   if (!response.ok) {
    //     throw new Error('Failed to fetch user info');
    //   }
    //   const data: OrderInfo[] = await response.json();
    //   return data;
    console.log("Fetch order for user ", userId);
    const dummydata: OrderInfo[] = ChrisOrderList;
    return dummydata;
  } catch (error) {
    throw new Error(
      `Error fetching user's order history list: ${error}`
    );
  }
};
