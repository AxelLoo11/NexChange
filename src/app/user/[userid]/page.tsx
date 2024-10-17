import Navigation from '@/components/Navigation';
import { mockUser3 } from '@/mockdata/mockuser';
import { UserInfo } from '@/models/userInfo';

import React from 'react';
import Image from 'next/image';
import TabGallary from '@/components/TabGallary';
import LogoutButton from '@/components/LogoutBtn';
import { cookies } from 'next/headers';

export default function UserInfoPage({ params }: { params: { userid: string } }) {
  const cookieStore = cookies();
  const userId = cookieStore.get('userid')?.value || ""; // login user's userid

  const isReadOnly: boolean = params.userid === userId ? false : true;

  const fetchedUserInfo: UserInfo = mockUser3 // just for ui design ...
  const tabs = [
    { tabName: 'Wish List', tabType: "Post", tabValue: fetchedUserInfo.wishlist },
    { tabName: 'Post History', tabType: "Post", tabValue: fetchedUserInfo.postHistory },
  ];

  return (
    <div className="bg-gray-100 min-h-[calc(100vh-5rem)] lg:flex w-full">
      <div className='lg:w-40 w-0'>
        <Navigation userId={userId} />
      </div>

      <div className="flex flex-col w-full lg:w-[calc(100vw-10rem)]">
        {/* User Basic Info Part */}
        <div className='flex w-full h-40 bg-white p-4 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]'>
          <div className="flex items-center w-full">
            {/* User Profile Image */}
            <Image
              src={`/images/${fetchedUserInfo.imageUrl}.jpg`}
              alt={`${fetchedUserInfo.nickname}'s profile picture`}
              className="rounded-full flex-none"
              width={80}
              height={80}
            />
            <div className="ml-4 flex-auto">
              <h2 className="text-xl font-bold">{fetchedUserInfo.nickname}</h2>
            </div>
            {!isReadOnly && (
              <div className='flex-none'>
                <LogoutButton />
              </div>
            )}
          </div>
        </div>

        {/* User Wishlist & Post History Gallary with Navigation Bar */}
        <div className='w-full flex-auto overflow-auto p-4'>
          <TabGallary
            tabs={tabs}
          />
        </div>
      </div>
    </div>
  )
}
