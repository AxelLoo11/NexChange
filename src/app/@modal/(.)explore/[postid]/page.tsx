import React from 'react';
import PostModalClientComponent from './postModalClientComponent';
import { cookies } from 'next/headers';
import { checkPostInWish, fetchPostById } from '@/lib';

async function PostDetailModalPage({ params }: { params: { postid: string } }) {
    const cookieStore = cookies();
    const userId = cookieStore.get('userid')?.value || "";
    const token = cookieStore.get('token')?.value || "";
    const tokenType = cookieStore.get('tokenType')?.value || "";
    const authHeader: string = `${tokenType}${token}`;

    const post = await fetchPostById(params.postid, authHeader);
    const isFavorite = await checkPostInWish(params.postid, userId, authHeader);
    const isOwner = post.userId === userId;

    console.log("Intercepting Mounted!!!");

    return (
        <>
            <PostModalClientComponent post={post} isFavorite={isFavorite} userId={userId} isOwner={isOwner} />
        </>
    )
}

export default PostDetailModalPage