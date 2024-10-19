import FeedGrid from '@/components/FeedGrid';
import Navigation from '@/components/Navigation';
import { Post } from '@/models';
import React from 'react';
import { cookies } from 'next/headers';

// Server-side fetch for Posts
async function fetchPosts(): Promise<Post[]> {
  const cookieStore = cookies(); // Access cookies
  const token = cookieStore.get('token');
  const tokenType = cookieStore.get('tokenType');

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/post`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${tokenType?.value}${token?.value}`, // Include token in headers
    },
    cache: 'no-store', // Ensures fresh data is fetched
  });

  if (!res.ok) {
    throw new Error('Failed to fetch Posts');
  }

  return res.json();
}

export default async function ExplorePage() {
  const posts: Post[] = await fetchPosts();
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
