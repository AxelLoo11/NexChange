/*  
    ------------------------------------
    User Service Data Type 
    ------------------------------------
*/

export type UserProfile = {
  userId: string;
  userAvatarURL: string;
  userNickName: string;
};

export type UserContact = {
  contactId: string;
  contactListId?: string; // can be optional ?
  contactName: string;
  contactAddress: string;
  postalCode: string;
  contactNumber: string;
  defaultContact: boolean;
};

export type UserWishPost = {
  wishPostId: string;
  wishPostListId?: string; // can be optional ?
  refPost: RefPost;
};

export type UserPostHistory = {
  postHistoryId: string;
  postHistoryListId?: string;
  refPost: RefPost;
};

export type UserOrderHistory = {
  orderHistoryListId?: string;
  userId?: string;
  orderHistoryId: string;
  refOrderId: string;
  refOrderTitle: string; // ref order's refPostTitle ?
  refOrderShortcutURL: string;
  refOrderPrice: number; // ref order's refPostPrice
  refOrderStatus: string;
};

export type UserDetailInfo = {
  userId: string;
  userProfile: UserProfile;
  userWishPostList: UserWishPost[];
  userPostHistoryList: UserPostHistory[];
};

export type PostHitory = {
  postHistoryListId: string;
  userId: string;
  postHistoryId: string;
  refPostId: string;
  refPostTitle: string;
  refPostShortcutURL: string;
  refPostStatus: string;
  refPostPrice: number;
};

export type UserPostHistoryList = {
  postHistoryListId: string;
  userId: string;
  postHistories: PostHitory[];
};

export type WishPost = {
  wishPostId: string;
  refPostId: string;
  refPostPrice: number;
  refPostShortcutURL: string;
  refPostStatus: string;
  refPostTitle: string;
};

export type UserWishPostList = {
  wishPostListId: string;
  userId: string;
  wishPosts: WishPost[];
};

/*  
    ------------------------------------
    Post Service Data Type 
    ------------------------------------
*/

export type PostImage = {
  postImageId: string;
  postImageURL: string;
  postId: string;
};

export type Post = {
  postId: string;
  userId: string; // post owner id
  postTittle: string;
  postName: string;
  postDescription: string | null; // allow null value when get all posts
  postPrice: number;
  postStatus: string;
  postShortcutURL: string;
  postImages: PostImage[] | null; // allow null value when get all posts
  postSeller: {
    sellerName: string;
    sellerAvatarURL: string;
  };
};

export type RefPost = {
  refPostId: string;
  refPostTitle: string;
  refPostShortCutURL: string;
  refPostPrice: number;
  refPostStatus?: string;
};

/*  
    ------------------------------------
    Order Service Data Type 
    ------------------------------------
*/

export type Order = {
  orderId: string;
  refBuyer: OrderUserDetail; // includong buyer profile and contact
  refSeller: OrderUserDetail; // only seller profile
  refPost: RefPost;
  dateTimeCreated: Date;
  orderStatus: string;
};

export type OrderDetail = {
  orderId: string;
  refPostId: string;
  refPostTitle: string;
  refPostShortcutURL: string;
  refPostPrice: number;
  orderStatus: string;
  sellerDetail: {
    sellerId: string;
    refUserId: string;
    sellerName: string;
    sellerAvatarURL: string;
  };
  buyerDetail: {
    buyerId: string;
    refUserId: string;
    buyerName: string;
    buyerAddress: string;
    buyerPostalCode: string;
    buyerContactNumber: string;
  };
  userId: string;
  createdAt: Date;
};

export type OrderUserDetail = {
  userProfile: UserProfile;
  userContact?: UserContact;
};

export type UserContactList = {
  contactListId: string;
  userId: string;
  userContacts: UserContact[];
};

export type UserOrderHistoryList = {
  orderHistoryListId: string;
  userId: string;
  userOrderHistories: UserOrderHistory[];
};
