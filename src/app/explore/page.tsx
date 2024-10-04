import FeedGrid from '@/components/FeedGrid';
import Navigation from '@/components/Navigation';
import React from 'react';

export default function ExplorePage() {
  const userId = "123"; // later change to fetch user id from header? or other place ...

  return (
    <div className="bg-gray-100 min-h-screen flex w-full">
      <div className='lg:w-40 w-0'>
        <Navigation userId={userId} />
      </div>
      
      <div className="p-4 w-full lg:w-[calc(100vw-10rem)]">
        <FeedGrid posts={[]}/>
      </div>
    </div>
  )
}
