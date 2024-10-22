import {
  UserProfile,
  UserContact,
  Post,
  RefPost,
  UserPostHistory,
  OrderUserDetail,
  Order,
  UserDetailInfo,
} from "@/models";

const fakeDescription: string[] = [
  "Voluptate tempor aliquip sint nostrud sint commodo officia culpa sint tempor nisi labore reprehenderit. Laborum irure sint minim non est ipsum quis enim aliquip aute ea nostrud incididunt velit enim culpa fugiat. Velit sint anim laborum dolor ea nostrud ad esse elit sunt quis reprehenderit officia ipsum consectetur ipsum ea. Adipisicing reprehenderit deserunt commodo incididunt eu est excepteur eu voluptate enim commodo commodo do consequat irure consectetur.",
  "Nostrud duis irure cupidatat veniam id Lorem occaecat aliqua id nulla irure dolor do pariatur cillum. Anim Lorem veniam cillum esse do irure cupidatat aliqua reprehenderit amet eiusmod id dolore ut aliquip. Incididunt amet sint deserunt sit qui velit quis ut proident duis dolore cupidatat cupidatat minim laborum nulla excepteur nostrud. Aliquip fugiat ullamco reprehenderit mollit enim quis ipsum dolore deserunt cupidatat Lorem consequat elit laborum duis quis.",
  "Velit nostrud minim cupidatat et reprehenderit proident voluptate consequat proident. Eiusmod amet laboris sint voluptate est sit irure laborum consequat. Duis ut sit reprehenderit nulla reprehenderit consequat anim nulla officia ex elit aliqua.",
];

const postStatusEnum: string[] = [
  "PENDING",
  "ACTIVE",
  "IN_TRANSACTION",
  "SOLD",
];

// Sample: https://picsum.photos/seed/{seed}/300/300
const FAKE_IMG_BASE_URL: string = "https://picsum.photos/seed";
const FAKE_IMG_BASE_URL_2: string = "https://picsum.photos/id";

const orderStatusEnum: string[] = [
  "UNPAID",
  "EXPIRED",
  "PAID BUT NOT SHIPPED",
  "SHIPPED",
  "SHIPPING",
  "RECEIVED",
  "COMPLETED",
]; // LENGTH = 7

const userAccount1 = {
  userId: "testuser-001",
  userEmail: "testuser001@mail.com",
  userPassword: "password001",
};

const userAccount2 = {
  userId: "testuser-002",
  userEmail: "testuser002@mail.com",
  userPassword: "password002",
};

const userAccount3 = {
  userId: "testuser-003",
  userEmail: "testuser@mail.com",
  userPassword: "password003",
};

export const fakeuseraccounts = [userAccount1, userAccount2, userAccount3];

// fake user profiles
export const profileWaldo: UserProfile = {
  userId: "testuser-001",
  userAvatarURL: "01.jpg",
  userNickName: "Waldo Kain",
};

export const profileThora: UserProfile = {
  userId: "testuser-002",
  userAvatarURL: "02.jpg",
  userNickName: "Thora Lane",
};

export const profileUlva: UserProfile = {
  userId: "testuser-003",
  userAvatarURL: "03.jpg",
  userNickName: "Ulva Stevens",
};

export const fakeProfiles: UserProfile[] = [
  profileWaldo,
  profileThora,
  profileUlva,
];

// fake user contacts
const createFakeContact = (
  num: number,
  contactName: string,
  contactListNum: number,
  defaultContact: boolean
): UserContact => {
  const fakeAddressList: string[] = ["123 Main St", "456 Main St"];
  const fakePostalList: string[] = ["123456", "654321"];
  const fakeContactNumber: string[] = ["+65 12345678", "+65 87654321"];
  return {
    contactId: `testcontact-${num.toString().padStart(3, "0")}`,
    contactListId: `testcontactlist-${contactListNum
      .toString()
      .padStart(3, "0")}`,
    contactName,
    contactAddress: fakeAddressList[num % 2],
    postalCode: fakePostalList[num % 2],
    contactNumber: fakeContactNumber[num % 2],
    defaultContact,
  };
};

const contact1: UserContact = createFakeContact(
  1,
  profileWaldo.userNickName,
  1,
  true
);

const contact2: UserContact = createFakeContact(
  2,
  profileWaldo.userNickName,
  1,
  false
);

const contact3: UserContact = createFakeContact(
  3,
  profileThora.userNickName,
  2,
  true
);

const contact4: UserContact = createFakeContact(
  4,
  profileUlva.userNickName,
  3,
  true
);

export const fakeuserContacts: UserContact[] = [
  contact1,
  contact2,
  contact3,
  contact4,
];

export const fakeuserContactLists = [
  { userId: "testuser-001", contactListId: "testcontactlist-001" },
  { userId: "testuser-002", contactListId: "testcontactlist-002" },
  { userId: "testuser-003", contactListId: "testcontactlist-003" },
];

// fake posts generate functions
const createFakePost = (
  num: number,
  owner: UserProfile,
  status: number
): Post => {
  const imageurls: string[] = [];
  for (let i = 0; i < (num % 4) + 2; i++) {
    imageurls.push(`${FAKE_IMG_BASE_URL_2}/${num * 5 + i}/200/300`);
  }

  return {
    postId: `testpost-${num.toString().padStart(3, "0")}`,
    userId: owner.userId,
    postTitle: `Post ${num.toString().padStart(3, "0")}`,
    postName: `Product ${num.toString().padStart(3, "0")}`,
    postDescription: fakeDescription[num % 3],
    postPrice: num * 5.0,
    postStatus: postStatusEnum[status],
    postShortcutURL: `${FAKE_IMG_BASE_URL}/${num
      .toString()
      .padStart(3, "0")}/300/300`,
    postImages: imageurls,
    postSeller: {
      sellerName: owner.userNickName,
      sellerAvatarURL: owner.userAvatarURL,
    },
  };
};

export const getRefPost = (post: Post): RefPost => {
  return {
    refPostId: post.postId,
    refPostTitle: post.postTitle,
    refPostShortcutURL: post.postShortcutURL,
    refPostPrice: post.postPrice,
    refPostStatus: post.postStatus,
  };
};

// generated fake posts
const generatePosts = (): Post[] => {
  // ACTIVE POST: 0-6 for Waldo, 7-12 for Thora
  // SPECIAL POST: 13-16 for Waldo
  const generatedPosts: Post[] = [];

  for (let i = 0; i < 16; i++) {
    if (i < 6) {
      generatedPosts.push(createFakePost(i + 1, profileWaldo, 1));
    } else if (i < 12) {
      generatedPosts.push(createFakePost(i + 1, profileThora, 1));
    } else if (i < 13) {
      generatedPosts.push(createFakePost(i + 1, profileWaldo, 0)); // pending - 13
    } else if (i < 14) {
      generatedPosts.push(createFakePost(i + 1, profileWaldo, 2)); // in-transaction - 14
    } else {
      generatedPosts.push(createFakePost(i + 1, profileWaldo, 3)); // sold - 15,16
    }
  }

  return generatedPosts;
};

export const fakeposts: Post[] = generatePosts(); // 16 posts

const generatePostHistory = (
  ownerid: string,
  startId: number
): UserPostHistory[] => {
  const filteredPosts: Post[] = fakeposts.filter((p) => p.userId === ownerid);
  const temparr: UserPostHistory[] = [];
  let num = startId;

  for (const mypost of filteredPosts) {
    temparr.push({
      postHistoryId: `testposthistory-${num.toString().padStart(3, "0")}`,
      refPost: getRefPost(mypost),
    });
    num++;
  }

  return temparr;
};

const createFakeOrder = (
  num: number,
  status: number,
  buyer: OrderUserDetail,
  seller: OrderUserDetail,
  post: RefPost
): Order => {
  return {
    orderId: `testorder-${num.toString().padStart(3, "0")}`,
    refBuyer: buyer,
    refSeller: seller,
    refPost: post,
    createdAt: new Date(2024, 9, 8, 10, num * 5),
    orderStatus: orderStatusEnum[status],
  };
};

// generate fake orders - only for user Ulva
const generateOrders = (): Order[] => {
  const orders: Order[] = [];
  const buyer: OrderUserDetail = {
    userProfile: profileUlva,
    userContact: fakeuserContacts[3],
  };

  const seller: OrderUserDetail = {
    userProfile: profileWaldo,
  };

  orders.push(createFakeOrder(1, 0, buyer, seller, getRefPost(fakeposts[12]))); // pending post 13
  orders.push(createFakeOrder(2, 2, buyer, seller, getRefPost(fakeposts[13]))); // in-transaction post 14

  orders.push(createFakeOrder(3, 6, buyer, seller, getRefPost(fakeposts[14])));
  orders.push(createFakeOrder(4, 6, buyer, seller, getRefPost(fakeposts[15]))); // completed order <=> sold post 15,16

  orders.push(createFakeOrder(5, 1, buyer, seller, getRefPost(fakeposts[0]))); // expired order

  return orders;
};

export const fakeorders: Order[] = generateOrders();

const userDetailInfo1: UserDetailInfo = {
  userId: profileWaldo.userId,
  userProfile: profileWaldo,
  userWishPostList: [
    { wishPostId: "testwishpost-001", refPost: getRefPost(fakeposts[6]) },
    { wishPostId: "testwishpost-002", refPost: getRefPost(fakeposts[7]) },
  ],
  userPostHistoryList: generatePostHistory(profileWaldo.userId, 1),
};

const userDetailInfo2: UserDetailInfo = {
  userId: profileThora.userId,
  userProfile: profileThora,
  userWishPostList: [
    { wishPostId: "testwishpost-003", refPost: getRefPost(fakeposts[1]) },
  ],
  userPostHistoryList: generatePostHistory(profileThora.userId, 11),
};

const userDetailInfo3: UserDetailInfo = {
  userId: profileUlva.userId,
  userProfile: profileUlva,
  userWishPostList: [
    { wishPostId: "testwishpost-004", refPost: getRefPost(fakeposts[1]) },
    { wishPostId: "testwishpost-005", refPost: getRefPost(fakeposts[3]) },
  ],
  userPostHistoryList: [],
};

export const userinfoList: UserDetailInfo[] = [
  userDetailInfo1,
  userDetailInfo2,
  userDetailInfo3,
];
