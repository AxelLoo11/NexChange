import {
  fakeorders,
  fakeposts,
  fakeProfiles,
  fakeuseraccounts,
  fakeuserContactLists,
  fakeuserContacts,
  userinfoList,
} from "@/mockdata";

// /api/auth/login
export function mockCheckAuth(email: string, password: string): string | null {
  const authdata = fakeuseraccounts.find((u) => u.userEmail === email);

  if (authdata) {
    return authdata.userPassword === password ? authdata.userId : null;
  }

  return null;
}

// /api/order
export function fakeGetOrdertData(orderId: string) {
  const rawdata = fakeorders.find((o) => o.orderId === orderId);
  if (rawdata) {
    const userId = rawdata.refBuyer.userProfile.userId;
    return {
      orderId: orderId,
      refPostId: rawdata.refPost.refPostId,
      refPostTitle: rawdata.refPost.refPostTitle,
      refPostShortcutURL: rawdata.refPost.refPostShortCutURL,
      refPostPrice: rawdata.refPost.refPostPrice,
      orderStatus: rawdata.orderStatus,
      sellerDetail: {
        sellerId: `testsellerId-${orderId}`,
        refUserId: rawdata.refSeller.userProfile.userId,
        sellerName: rawdata.refSeller.userProfile.userNickName,
        sellerAvatarURL: rawdata.refSeller.userProfile.userAvatarURL,
      },
      buyerDetail: {
        buyerId: `testbuyerId-${orderId}`,
        refUserId: userId,
        buyerName: rawdata.refBuyer.userProfile.userNickName,
        buyerAddress: rawdata.refBuyer.userContact?.contactAddress,
        buyerPostalCode: rawdata.refBuyer.userContact?.postalCode,
        buyerContactNumber: rawdata.refBuyer.userContact?.contactNumber,
      },
      userId: userId,
      dateTimeCreated: rawdata.dateTimeCreated,
    };
  }
  return null;
}

// /api/post
export function fakeGetPostDataById(postId: string) {
  const postdetail = fakeposts.find((p) => p.postId === postId);

  if (postdetail) {
    return postdetail;
  }

  return null;
}

export function fakeGetAllPostData() {
  return fakeposts;
}

// /api/user/contact
export function fakeGetUserContactsData(userId: string) {
  const listId = fakeuserContactLists.find((lid) => lid.userId === userId);
  const rawdata = fakeuserContacts.filter(
    (c) => c.contactListId === listId?.contactListId
  );
  const data = {
    contactListId: listId?.contactListId || "errorlistid",
    userId: userId,
    userContacts: rawdata,
  };
  return data;
}

// /api/user/orderhistory
export function fakeGetUserOrderHistoryData(userId: string) {
  const rawdata = fakeorders.filter(
    (oh) => oh.refBuyer.userProfile.userId === userId
  );
  const listdata = rawdata.map((order) => {
    return {
      orderHistoryListId: `orderhistorylist-${userId}`,
      userId: userId,
      orderHistoryId: `orderhistory-${userId}`,
      refOrderId: order.orderId,
      refOrderTitle: order.refPost.refPostTitle,
      refOrderShortcutURL: order.refPost.refPostShortCutURL,
      refOrderPrice: order.refPost.refPostPrice,
      refOrderStatus: order.orderStatus,
    };
  });

  return {
    orderHistoryListId: `orderhistorylist-${userId}`,
    userId: userId,
    userOrderHistories: listdata,
  };
}

// /api/user/posthistory
export function fakeGetUserPostHistoryData(userId: string) {
  const oridata = userinfoList.find((uif) => uif.userId === userId);
  const rawdata = oridata?.userPostHistoryList;

  if (rawdata) {
    const postHistoryListId = `testposthistoryId-${userId}`;
    const listdata = rawdata.map((ph) => {
      return {
        postHistoryListId: postHistoryListId,
        userId: userId,
        postHistoryId: ph.postHistoryId,
        refPostId: ph.refPost.refPostId,
        refPostTitle: ph.refPost.refPostTitle,
        refPostShortcutURL: ph.refPost.refPostShortCutURL,
        refPostStatus: ph.refPost.refPostStatus,
        refPostPrice: ph.refPost.refPostPrice, // ???? missing in postman ...
      };
    });
    return {
      postHistoryListId: postHistoryListId,
      userId: userId,
      postHistories: listdata,
    };
  }

  return null;
}

// /api/user/profile
export function fakeGetUserProfileData(userId: string) {
  return fakeProfiles.find((p) => p.userId === userId);
}

// /api/user/wishlist
export function fakeGetUserWishListData(userId: string) {
  const oridata = userinfoList.find((uif) => uif.userId === userId);
  const rawdata = oridata?.userWishPostList;

  if (rawdata) {
    const wishPostListId = `testwishpostlist-${userId}`;
    const listdata = rawdata.map((wish) => {
      return {
        wishPostId: wish.wishPostId,
        refPostId: wish.refPost.refPostId,
        refPostPrice: wish.refPost.refPostPrice,
        refPostShortcutURL: wish.refPost.refPostShortCutURL,
        refPostStatus: wish.refPost.refPostStatus,
        refPostTitle: wish.refPost.refPostTitle,
      };
    });

    return {
      wishPostListId: wishPostListId,
      userId: userId,
      wishPosts: listdata,
    };
  }

  return null;
}

export function fakeCheckPostWish(userId: string, postId: string): boolean {
  const userinfo = userinfoList.find((user) => user.userId === userId);
  const checkResult = userinfo?.userWishPostList.find(
    (post) => post.refPost.refPostId === postId
  );
  return checkResult ? true : false;
}
