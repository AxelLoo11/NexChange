import { PostInfo } from '@/models/postInfo';
import React from 'react';
import FeedCard from './FeedCard';

const FeedGrid = ({ posts }: { posts: PostInfo[] }) => (
  <div className="container mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {posts.map(post => (
      <FeedCard key={post.id} post={post} />
    ))}
  </div>
);

export default FeedGrid;
