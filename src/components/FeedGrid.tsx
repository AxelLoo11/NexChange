"use client";

import React, { useState } from 'react';
import FeedCard from './FeedCard';
import { Post } from '@/models';

const FeedGrid = ({ posts }: { posts: Post[] }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter posts based on searchQuery
  const filteredPosts = posts.filter(post =>
    post.postName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto">
      {/* Search bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Posts grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 h-full w-full overflow-auto">
        {filteredPosts.map(post => (
          <FeedCard key={post.postId} post={post} />
        ))}
      </div>
    </div>
  );
}

export default FeedGrid;
