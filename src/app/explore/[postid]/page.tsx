import React from 'react';
import { cookies } from 'next/headers';
import PostClientComponent from './postClientComponent';
import { checkPostInWish, fetchPostById } from '@/lib';

async function PostDetailPage({ params }: { params: { postid: string } }) {
    const cookieStore = cookies();
    const userId = cookieStore.get('userid')?.value || "";
    const token = cookieStore.get('token')?.value || "";
    const tokenType = cookieStore.get('tokenType')?.value || "";
    const authHeader: string = `${tokenType}${token}`;

    const post = await fetchPostById(params.postid, authHeader);
    const isFavorite = await checkPostInWish(params.postid, userId, authHeader);
    const isOwner = post.userId === userId;

    return (
        <>
            <PostClientComponent post={post} isFavorite={isFavorite} userId={userId} isOwner={isOwner} />
        </>
    )
};

export default PostDetailPage;