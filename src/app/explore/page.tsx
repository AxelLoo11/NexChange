import FeedGrid from '@/components/FeedGrid';
import Navigation from '@/components/Navigation';
import { mockPostList } from '@/mockdata/mockpost';
import { PostInfo } from '@/models/postInfo';
import React from 'react';
import { cookies } from 'next/headers';

export default function ExplorePage() {
  const cookieStore = cookies();

  const userId = cookieStore.get('userid')?.value || "";
  const dummyPosts: PostInfo[] = mockPostList; // later change to fetch posts from other service ...

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
