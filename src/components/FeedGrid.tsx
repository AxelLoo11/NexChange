import { PostInfo } from '@/models/postInfo';
import React from 'react';

const FeedGrid = ({ posts }: { posts: PostInfo[] }) => (
  <div className="container mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {Array(12)
      .fill(0)
      .map((_, i) => (
        <FeedCard key={i} />
      ))}
  </div>
);

const FeedCard = () => (
  <div className="bg-white shadow rounded overflow-hidden">
    <img
      src="https://via.placeholder.com/300"
      alt="Post"
      className="w-full h-48 object-cover"
    />
    <div className="p-4">
      <h2 className="font-bold text-md mb-2">Post Title</h2>
      <p className="text-sm text-gray-600">Short description of the post.</p>
    </div>
  </div>
);

export default FeedGrid;
