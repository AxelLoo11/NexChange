import Navigation from '@/components/Navigation';
import { mockUser1, mockUser3 } from '@/mockdata/mockuser';
import { UserInfo } from '@/models/userInfo';

import React from 'react';
import Image from 'next/image';
import TabGallary from '@/components/TabGallary';

export default function UserInfoPage({ params }: { params: { userid: string } }) {
  const fetchedUserInfo: UserInfo = mockUser3 // just for ui design ...
  const tabs = [
    { tabName: 'Wish List', tabType: "Post", tabValue: fetchedUserInfo.wishlist },
    { tabName: 'Post History', tabType: "Post", tabValue: fetchedUserInfo.postHistory },
  ];

  return (
    <div className="bg-gray-100 min-h-screen lg:flex w-full">
      <div className='lg:w-40 w-0'>
        <Navigation userId={params.userid} />
      </div>

      <div className="flex flex-col w-full lg:w-[calc(100vw-10rem)]">
        {/* User Basic Info Part */}
        <div className='flex flex-none w-full h-40 bg-white p-4 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]'>
          <div className="flex items-center">
            {/* User Profile Image */}
            <Image
              src={`/images/${fetchedUserInfo.imageUrl}.jpg`}
              alt={`${fetchedUserInfo.nickname}'s profile picture`}
              className="rounded-full"
              width={60}
              height={60}
            />
            <div className="ml-4">
              <h2 className="text-xl font-bold">{fetchedUserInfo.nickname}</h2>
              <p>{fetchedUserInfo.email}</p>
              <div>
                {/* Contact Display */}
              </div>
            </div>
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
