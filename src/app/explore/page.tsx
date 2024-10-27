import FeedGrid from '@/components/FeedGrid';
import Navigation from '@/components/Navigation';
import { Post } from '@/models';
import React from 'react';
import { cookies } from 'next/headers';
import { fetchAllPosts } from '@/lib';

export default async function ExplorePage() {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || "";
  const tokenType = cookieStore.get('tokenType')?.value || "";
  const authHeader: string = `${tokenType}${token}`;

  const allPosts: Post[] = await fetchAllPosts(authHeader);
  const posts: Post[] = allPosts.filter(p => p.postStatus === "ACTIVE");

  return (
    <div className="bg-gray-100 top-20 min-h-[calc(100vh-5rem)] lg:flex w-full overflow-auto sticky">
      <div className='lg:w-40 w-0'>
        <Navigation />
      </div>

      <div className="p-4 w-full lg:w-[calc(100vw-10rem)] h-[calc(100vh-5rem)]">
        <FeedGrid posts={posts} />
      </div>
    </div>
  )
}
