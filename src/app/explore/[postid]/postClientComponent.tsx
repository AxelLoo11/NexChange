"use client";

import Navigation from '@/components/Navigation';
import PostDetail from '@/components/PostDetail';
import { Post } from '@/models';
import React from 'react';

export default function PostClientComponent({
    post, isFavorite, userId, isOwner
}: {
    post: Post; isFavorite: boolean; userId: string; isOwner: boolean;
}) {
    return (
        <div className="bg-gray-100 top-20 min-h-[calc(100vh-5rem)] lg:flex w-full overflow-auto sticky">
            <div className='lg:w-40 w-0'>
                <Navigation />
            </div>

            <div className="p-4 w-full lg:w-[calc(100vw-10rem)] lg:h-[calc(100vh-5rem)] h-[calc(100vh-9rem)]">
                <PostDetail post={post} isFavorite={isFavorite} isOwner={isOwner} userId={userId} />
            </div>
        </div>
    );
}