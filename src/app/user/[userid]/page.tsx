import Navigation from '@/components/Navigation';
import React from 'react';
import Image from 'next/image';
import TabGallary from '@/components/TabGallary';
import LogoutButton from '@/components/LogoutBtn';
import { cookies } from 'next/headers';
import { RefPost, UserPostHistoryList, UserWishPostList } from '@/models';
import { fetchUserPostHistory, fetchUserWishList } from '@/lib';

export default async function UserInfoPage({ params }: { params: { userid: string } }) {
  const cookieStore = cookies();
  const userId = cookieStore.get('userid')?.value || ""; // login user's userid
  const token = cookieStore.get('token')?.value || "";
  const tokenType = cookieStore.get('tokenType')?.value || "";
  const authHeader: string = `${tokenType}${token}`;

  const userProfile = JSON.parse(decodeURIComponent(cookieStore.get('userData')?.value || ""));
  const userwishposts: UserWishPostList = await fetchUserWishList(userId, authHeader);
  const userposthistorys: UserPostHistoryList = await fetchUserPostHistory(userId, authHeader);

  const isReadOnly: boolean = params.userid === userId ? false : true;

  const userWishPostList: RefPost[] = userwishposts.wishPosts.map((post) => {
    return {
      refPostId: post.refPostId,
      refPostTitle: post.refPostTitle,
      refPostShortcutURL: post.refPostShortcutURL,
      refPostPrice: post.refPostPrice,
      refPostStatus: post.refPostStatus,
    }
  });
  const userPostHistoryList: RefPost[] = userposthistorys.postHistories.map((post) => {
    return {
      refPostId: post.refPostId,
      refPostTitle: post.refPostTitle,
      refPostShortcutURL: post.refPostShortcutURL,
      refPostPrice: post.refPostPrice,
      refPostStatus: post.refPostStatus,
    }
  });

  const tabs = [
    { tabName: 'Wish List', tabValue: userWishPostList },
    { tabName: 'Post History', tabValue: userPostHistoryList },
  ];

  return (
    <div className="bg-gray-100 min-h-[calc(100vh-5rem)] lg:flex w-full">
      <div className='lg:w-40 w-0'>
        <Navigation />
      </div>

      <div className="flex flex-col w-full lg:w-[calc(100vw-10rem)] h-full">
        {/* User Basic Info Part */}
        <div className='flex w-full h-40 bg-white p-4 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]'>
          <div className="flex items-center w-full">
            {/* User Profile Image */}
            <Image
              src={`/images/${userProfile.userAvatarURL}`}
              alt={`${userProfile.userNickName}'s profile picture`}
              className="rounded-full flex-none"
              width={80}
              height={80}
            />
            <div className="ml-4 flex-auto">
              <h2 className="text-xl font-bold">{userProfile.userNickName}</h2>
            </div>
            {!isReadOnly && (
              <div className='flex-none'>
                <LogoutButton />
              </div>
            )}
          </div>
        </div>

        {/* User Wishlist & Post History Gallary with Navigation Bar */}
        <div className='w-full flex-auto p-4 h-[calc(100vh-15rem)]'>
          <TabGallary
            tabs={tabs}
          />
        </div>
      </div>
    </div>
  )
}
