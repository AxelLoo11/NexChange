import React from 'react';
import FeedCard from './FeedCard';
import { Post } from '@/models';

const FeedGrid = ({ posts }: { posts: Post[] }) => (
  <div className="container mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 h-full w-full overflow-auto">
    {posts.map(post => (
      <FeedCard key={post.postId} post={post} />
    ))}
  </div>
);

export default FeedGrid;
