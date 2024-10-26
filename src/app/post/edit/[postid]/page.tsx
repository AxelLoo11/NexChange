import React from 'react'
import { cookies } from 'next/headers';
import PostEditClientComponent from './postEditClientComponent';
import { fetchPostById } from '@/lib';

export default async function PostEditPage({ params }: { params: { postid: string } }) {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value || "";
    const tokenType = cookieStore.get('tokenType')?.value || "";
    const authHeader: string = `${tokenType}${token}`;

    const post = await fetchPostById(params.postid, authHeader);

    return (
        <>
            <PostEditClientComponent post={post} />
        </>
    );
}
