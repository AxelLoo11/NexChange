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
  postTitle: string;
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
  refPostShortcutURL: string;
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

export type OrderUserDetail = {
  userProfile: UserProfile;
  userContact?: UserContact;
};
