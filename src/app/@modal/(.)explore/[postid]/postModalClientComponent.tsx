"use client";

import PostDetail from '@/components/PostDetail';
import PostModal from '@/components/PostModal';
import { Post } from '@/models';
import React from 'react';

export default function PostModalClientComponent({
    post, isFavorite, userId, isOwner
}: {
    post: Post; isFavorite: boolean; userId: string; isOwner: boolean;
}) {

    return (
        <PostModal>
            <PostDetail post={post} isFavorite={isFavorite} isOwner={isOwner} userId={userId} />
        </PostModal>
    );
}