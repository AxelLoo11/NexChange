import FeedGrid from '@/components/FeedGrid';
import Navigation from '@/components/Navigation';
import { PostInfo } from '@/models/postInfo';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function ExplorePage() {
  const userId = "123"; // later change to fetch user id from header? or other place ...
  const dummyPosts: PostInfo[] = []; // later change to fetch posts from other service ...

  for (let i = 0; i < 12; i++) {
    dummyPosts.push({
      id: uuidv4() as string,
      title: `Dummy Post ${i + 1}`,
      imageUrl: "https://via.placeholder.com/300",
      author: "Dummy User"
    });
  }

  return (
    <div className="bg-gray-100 top-20 min-h-[calc(100vh-5rem)] lg:flex w-full overflow-auto sticky">
      <div className='lg:w-40 w-0'>
        <Navigation userId={userId} />
      </div>

      <div className="p-4 w-full lg:w-[calc(100vw-10rem)] h-[calc(100vh-5rem)]">
        <FeedGrid posts={dummyPosts} />
      </div>
    </div>
  )
}
